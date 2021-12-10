import React from 'react';

const { Translator } = window;

const EmptyTree = () => {
    const emptyBadge = Translator.trans(/*@Desc("1")*/ 'taxonomy.1', {}, 'taxonomy_ui');
    const emptyContent = Translator.trans(
        /*@Desc("Your tree is empty. Start creating your structure")*/ 'taxonomy.empty',
        {},
        'taxonomy_ui',
    );

    return (
        <div className="c-tt-empty">
            <div className="c-tt-empty__badge">
                <div className="c-tt-badge">
                    <div className="c-tt-badge__content">{emptyBadge}</div>
                </div>
            </div>
            <div className="c-tt-empty__content">{emptyContent}</div>
        </div>
    );
};

export default EmptyTree;
