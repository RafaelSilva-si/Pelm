import React, { useState } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Checkbox, InputForm, SelectAsync, SelectInput } from '../../Utils';
import { useForm } from 'react-hook-form';
import PropTypes from '../../../lib/utils/propTypes';
import Card from '../../Utils/Card/FormCard';

const FormProduct = ({
    user,
    onSubmit,
    handleNavigation,
    codLabel,
    codInputProps,
    descLabel,
    descInputProps,
    marcaLabel,
    marcaInputProps,
    fornLabel,
    fornInputProps,
    groupLabel,
    groupInputProps,
    ncmLabel,
    ncmInputProps,
    vlrCompraLabel,
    vlrCompraInputProps,
    vlrVendaLabel,
    vlrVendaInputProps,
    margenLabel,
    margenInputProps,
    btnLabelSubmit,
    btnLabelCancel,
    ...restProps
}) => {

    const { register, handleSubmit, setValue, } = useForm({
        defaultValues: false,
    });

    const handleChange = selectedOption => {
        setValue('group.id', selectedOption.id);
        setGroupValue({ selectedOption });
    };
    const [group, setGroupValue] = useState({ selectedOption: {} });

    React.useEffect(() => {
        register({ name: 'group.id' });
    }, [register]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} {...restProps}>
            <Row style={{ marginTop: '40px' }}>
                <Col xl={2} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={codLabel}
                            {...codInputProps}
                            innerRef={register}
                        />
                    </Card>
                </Col>
                <Col xl={6} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={descLabel}
                            {...descInputProps}
                            innerRef={register}
                        />
                    </Card>
                </Col>
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <SelectAsync
                            placeholder={marcaLabel}
                            {...marcaInputProps}
                            options={[{ id: 1, name: 'Teste' }]}
                        />
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={fornLabel}
                            {...fornInputProps}
                            innerRef={register}
                        />
                    </Card>
                </Col>
                <Col xl={3} lg={12} md={12}>
                    <Card>
                        <SelectAsync
                            placeholder={groupLabel}
                            {...groupInputProps}
                            options={[{ id: 1, name: 'Teste' }]}
                            onChange={handleChange}
                            value={group.selectedOption}
                        />
                    </Card>
                </Col>
                <Col xl={5} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={ncmLabel}
                            {...ncmInputProps}
                            innerRef={register}
                        />
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xl={3} lg={12} md={12}>
                    <Card>
                        <SelectInput
                            label="Unidade de medida"
                            options={[{ id: 1, name: 'KG' }]}
                        />
                    </Card>
                </Col>
                <Col xl={3} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={vlrCompraLabel}
                            {...vlrCompraInputProps}
                            innerRef={register}
                        />
                    </Card>
                </Col>
                <Col xl={3} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={vlrVendaLabel}
                            {...vlrVendaInputProps}
                            innerRef={register}
                        />
                    </Card>
                </Col>
                <Col xl={3} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={margenLabel}
                            {...margenInputProps}
                            innerRef={register}
                        />
                    </Card>
                </Col>
            </Row>
            <Button
                color="danger"
                outline
                className="float-left col-md-2 mt-3"
                onClick={() => handleNavigation()}>
                {btnLabelCancel}
            </Button>
            <Button
                color="success"
                outline
                type="submit"
                className="float-right col-md-2 mt-3">
                {btnLabelSubmit}
            </Button>
        </form>
    )
}

FormProduct.defaultProps = {
    codLabel: 'Cod',
    codInputProps: {
        id: 'cod',
        name: 'cod',
    },
    descLabel: 'Descrição',
    descInputProps: {
        id: 'desc',
        name: 'desc',
    },
    marcaLabel: 'Marca',
    marcaInputProps: {
        id: 'marca'

    },
    fornLabel: 'Fornecedor',
    fornInputProps: {
        id: 'forn',
        name: 'forn',
    },
    ncmLabel: 'NCM',
    ncmInputProps: {
        id: 'ncm',
        name: 'ncm'
    },
    vlrCompraLabel: 'Valor de Compra',
    vlrCompraInputProps: {
        id: 'vlr_compra',
        name: 'vlr_compra',
    },
    vlrVendaLabel: 'Valor de Venda',
    vlrVendaInputProps: {
        id: 'vlr_venda',
        name: 'vlr_venda',
    },
    margenLabel: 'Margem',
    margenInputProps: {
        id: 'margem',
        name: 'margem'
    },
    btnLabelSubmit: 'Salvar',
    btnLabelCancel: 'Cancelar',
};

export default FormProduct;