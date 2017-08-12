import React, { Component } from 'react';

export default class List extends Component {
    render() {
        console.log(this.props.actions);

        const list = this.props.list.map((item, i) => {
            return (
                <li key={i} onClick={() => this.props.actions.removeFromList(i)}>{item}</li>
            );
        });

        return (
            <div>
                <ul>{list}</ul>
                {list.length > 1 && <button onClick={() => this.props.actions.sortList()}>Sort</button>}
            </div>
        );
    }
}