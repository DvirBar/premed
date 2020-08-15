import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../common/Section';

function SubpageItem({ subpage }) {
    return (
        <Section title={subpage.name}>
        </Section>
    )
}

SubpageItem.propTypes = {
    subpage: PropTypes.object.isRequired
}

export default SubpageItem
