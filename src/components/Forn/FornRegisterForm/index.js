import React, { useState } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { InputForm, SelectAsync, SelectInput } from '../../Utils';
import { useForm } from 'react-hook-form';
import Card from '../../Utils/Card/FormCard';
import { formatCnpjCpf, formatPhone, formatCellPhone } from '../../../lib/utils/functions';

const FormProduct = ({
    forn,
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
    documentLabel,
    documentInputProps,
    endLabel,
    endInputProps,
    telLabel,
    telInputProps,
    celLabel,
    celInputProps,
    representanteLabel,
    representanteInputProps,
    btnLabelSubmit,
    btnLabelCancel,
    ...restProps
}) => {

    console.log(forn)

    const { register, handleSubmit, setValue, } = useForm({
        defaultValues: forn,
    });

    
    const [document, setDocument] = useState();
    const handleDocument = (vlr) => {
        let value = formatCnpjCpf(vlr.target.value);
        setDocument(value);
    }

    const [tel, setTel] = useState();
    const handleTel = (vlr) => {
        let value = formatPhone(vlr.target.value);
        setTel(value);
    }

    const [cel, setCel] = useState();
    const handleCel = (vlr) => {
        let value = formatCellPhone(vlr.target.value);
        setCel(value);
    }


    React.useEffect(() => {
    }, [register]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} {...restProps}>
            <Row style={{ marginTop: '40px' }}>
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={fornLabel}
                            {...fornInputProps}
                            innerRef={register}
                        />
                    </Card>
                </Col>
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={documentLabel}
                            {...documentInputProps}
                            innerRef={register}
                            value={document}
                            onChange={handleDocument}
                        />
                    </Card>
                </Col>
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={representanteLabel}
                            {...representanteInputProps}
                            innerRef={register}
                        />
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xl={3} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={telLabel}
                            {...telInputProps}
                            innerRef={register}
                            value={tel}
                            onChange={handleTel}
                        />
                    </Card>
                </Col>
                <Col xl={3} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={celLabel}
                            {...celInputProps}
                            innerRef={register}
                            value={cel}
                            onChange={handleCel}
                        />
                    </Card>
                </Col>
                <Col xl={6} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={endLabel}
                            {...endInputProps}
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
    fornLabel: 'Fornecedor',
    fornInputProps: {
        id: 'forn',
        name: 'forn',
    },
    documentLabel: 'Documento',
    documentInputProps: {
        id: 'documento',
        name: 'documento',
    },
    endLabel: 'Endereço',
    endInputProps: {
        id: 'endereco',
        name: 'endereco'
    },
    telLabel: 'Telefone',
    telInputProps: {
        id: 'telefone',
        name: 'telefone',
    },
    celLabel: 'Celular',
    celInputProps: {
        id: 'celular',
        name: 'celular'
    },
    representanteLabel: 'Representante',
    representanteInputProps: {
        id: 'representante',
        name: 'representante',
    },
    btnLabelSubmit: 'Salvar',
    btnLabelCancel: 'Cancelar',
};

export default FormProduct;