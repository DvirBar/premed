import React, { Fragment } from 'react'

function NavigateDataSections({ paths, unis, changeSection }) {
    return (
        <div className="navigate-data-sections">
            {paths.length > 1 
            ? (
                <Fragment>
                    <p className="nav-section-item multi-path">
                        <span
                        onClick={() => changeSection()}
                        className="section-item main">
                            כללי
                        </span>
                    </p>
                    {paths.map(path => 
                        <p className="nav-section-item multi-path">
                            <span className="section-item main">{path.name}</span>

                            <span className="path-uni-list">
                                {unis?.map(uni => 
                                    uni.paths.includes(path._id) &&
                                        <span 
                                        className="section-item"
                                        onClick={() => changeSection(path, uni)}>
                                            {uni.name}
                                        </span>
                                )}
                            </span>
                        </p>
                    )}
                </Fragment>
            )
            : (
                <Fragment>
                    <p className="nav-section-item">
                        <span 
                        className="section-item"
                        onClick={() => changeSection()}>
                            כללי
                        </span>
                    {paths.map(path => 
                        <Fragment>
                            {unis?.map(uni => 
                                uni.paths.includes(path._id) &&
                                    <span 
                                    className="section-item"
                                    onClick={() => changeSection(path, uni)}>
                                        {uni.name}
                                    </span>
                            )}
                        </Fragment>
                    )}
                    </p>
                </Fragment>
            )}
        </div>
    )
}

export default NavigateDataSections
