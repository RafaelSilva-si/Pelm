import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { InputLabel, SelectLabel } from '../../../Utils';
import { ButtonsFilter, CollapseFilter } from '../../../Utils/Filter';
import { removeEmpty } from '../../../../lib/utils/functions';
import PropTypes from '../../../../lib/utils/propTypes';

const BrandForn = ({
    onSubmit,
    fornLabel,
    fornInputProps,
    forns,
    ...restProps
}) => {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: { active: 'true' },
    });


    const onSubmitForm = data => {
        let values = data;
        values = removeEmpty(values);
        onSubmit(values);
    };

    const [forn, setForn] = useState({selectedOption: {}})
    const handleChange = selectedOption => {
        setValue('forn', selectedOption.id);
        setForn({ selectedOption });
    };


    React.useEffect(() => {
        register({ name: 'forn' });
    }, [register]);



    return (
        <div {...restProps} className="mb-3">
            <CollapseFilter open>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <Row>
                        <Col xl={12} lg={12} md={12}>
                            <SelectLabel
                                label={fornLabel}
                                {...fornInputProps}
                                options={forns}
                                onChange={handleChange}
                                value={forn.selectedOption}
                            />
                        </Col>
                    </Row>
                    <ButtonsFilter />
                </form>
            </CollapseFilter>
        </div>
    );
};

BrandForn.propTypes = {
    fornLabel: PropTypes.string,
    fornInputProps: PropTypes.shape({}),
    docLabel: PropTypes.string,
    docInputProps: PropTypes.shape({}),
    onSubmit: PropTypes.func.isRequired,
    companies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

BrandForn.defaultProps = {
    fornLabel: 'Fornecedor',
    fornInputProps: {
        name: 'forn',
        id: 'forn',
        placeholder: 'Fornecedor...',
    },
};

export default BrandForn;
