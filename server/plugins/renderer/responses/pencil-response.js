const _ = require('lodash');
const Paper = require('@bigcommerce/stencil-paper');
const Fs = require('fs');
const Path = require('path');
const Handlebars = require('handlebars');
const internals = {};

module.exports = function (data, assembler) {
    this.respond = function (request, reply) {
        var response,
            output,
            paper,
            templatePath;

        var paper = new Paper(data.context.settings, data.context.theme_settings, assembler);

        // Set the environment to dev
        data.context.in_development = true;
        data.context.in_production = false;

        paper.addDecorator(internals.makeDecorator(request, data.context));
        paper.addDecorator(internals.debugBarDecorator(request, data.context));

        // Plugins have the opportunity to add/modify the response by using decorators
        _.each(request.app.decorators, function (decorator) {
            paper.addDecorator(decorator);
        })

        templatePath = internals.getTemplatePath(request, data);

        paper.loadTheme(templatePath, data.acceptLanguage, function () {
            if (request.query.debug === 'context') {
                return reply(data.context);
            }

            output = paper.renderTheme(templatePath, data);
            response = reply(output);
            response.code(data.statusCode);

            if (data.headers['set-cookie']) {
                response.header('set-cookie', data.headers['set-cookie']);
            }
        });
    };
};


internals.getTemplatePath = function (request, data) {
    var path = data.template_file;

    if (request.headers['stencil-options']) {
        var options = JSON.parse(request.headers['stencil-options']);

        if (options['render_with'] && typeof options['render_with'] === 'string') {

            path = options['render_with'].split(',');

            path = _.map(path, function (path) {
                return 'components/' + path;
            });

            if (path.length === 1) {
                path = path[0];
            }
        }
    }

    return path;
};


/**
 * Output post-processing
 *
 * @param request
 * @param context
 */
internals.makeDecorator = function (request, context) {
    return function(content) {
        var regex,
            debugBar;

        if (context.settings) {
            regex = new RegExp(internals.escapeRegex(context.settings.base_url), 'g');
            content = content.replace(regex, '');

            regex = new RegExp(internals.escapeRegex(context.settings.secure_base_url), 'g');
            content = content.replace(regex, '');
        }

        return content;
    }
};

/**
 * Output post-processing
 *
 * @param request
 * @param context
 */
internals.debugBarDecorator = function (request, context) {
    return content => {
        return content.replace(new RegExp('</body>'), `${debugBar(request, context)}\n</body>`);
    }
};

function debugBar(request, context) {
    const template = Fs.readFileSync(Path.join(__dirname, 'debug-bar.html'), { encoding: 'utf8' });

    return Handlebars.compile(template)({
        data: new Buffer(JSON.stringify({ context })).toString('base64'),
    });
}

/**
 * Scape html entities
 */
internals.escapeHtml = function (html) {
    const charsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&#34;',
    };

    return html.replace(/[&<>"]/g, tag => charsToReplace[tag] || tag);
}

/**
 * Scape special characters for regular expression
 *
 * @param string
 */
internals.escapeRegex = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};
