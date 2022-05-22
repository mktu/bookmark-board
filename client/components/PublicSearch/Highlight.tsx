import React from 'react';
import {  HighlightProps } from 'react-instantsearch-core';

export type PropsType = HighlightProps<BookmarkGroupIndex>;

const HighlightHit: React.FC<PropsType> = ({
    hit,
    highlight,
    attribute
}) => {
    const parsedHit = highlight({
        highlightProperty: '_highlightResult',
        attribute,
        hit,
    });
    return (
        <React.Fragment>
            {parsedHit.map(
                (part, index) =>
                    part.isHighlighted ? (
                        <mark key={index} className='font-semibold'>{part.value}</mark>
                    ) : (
                            <span key={index}>{part.value}</span>
                        )
            )}
        </React.Fragment>
    )
};

export default HighlightHit;