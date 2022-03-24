import React, { useState } from 'react';
import { Button, Row, Col } from 'reactstrap';
import {  InputForm, SelectAsync, SelectInput, SelectRowLabel } from '../../Utils';
import { useForm } from 'react-hook-form';
import { numberToPrice } from '../../../lib/utils/functions';
import Card from '../../Utils/Card/FormCard';

const FormProduct = ({
    user,
    forn,
    brands,
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
    uniInputProps,
    margenLabel,
    margenInputProps,
    btnLabelSubmit,
    btnLabelCancel,
    prod,
    ...restProps
}) => {

    console.log(prod)
    //<Options
    let fornOptions = {};
    let brandOptions = {};
    if (forn) {
        fornOptions = forn.map(index => ({id:index.id, name: index.forn}))
    }

    if (brands) {
        brandOptions = brands.map(index => ({id: index.id, name: index.name}))
    }
    //>

    
    const { register, handleSubmit, setValue, } = useForm({
        defaultValues: prod,
    });

    //< var state
    
    const [group, setGroupValue] = useState({ selectedOption: prod? {id: prod.grupo, name: 'Comida pra Dog'} : false });
    const [forns, setForn] = useState({selectedOption: prod? {id: prod.forn, name: prod.fornname} : false});
    const [brand, setBrand] = useState({selectedOption: prod? {id: prod.marca, name: prod.marcaname} : false})
    const [uni, setUni] = useState({selectedOption: prod? prod.unidade_medida === "KG" ? {id: 1, name: prod.unidade_medida} : {id: 2, name: prod.unidade_medida} : false})
    const [priceBuy, setPriceBuy] = useState(prod? prod.price_buy : 0);
    const [priceSale, setPriceSale] =  useState(prod? prod.price_sale : 0);
    const [margem, setMargem] = useState(0);



    //Functions state var
    const handleChange = (selectedOption, set, func) => {
        setValue(set, selectedOption.id);
        func({ selectedOption });
    };

    const handleChangeMoney = (value, func, set) => {
        let vlr = numberToPrice(value.target.value);
        setValue(set, vlr);
        func(vlr)
    }

    React.useEffect(() => {
        let lucro = (parseFloat(priceSale) - parseFloat(priceBuy))
        setMargem(`${(lucro / parseFloat(priceSale)) * 100}%`);
    }, [priceSale, priceBuy])

    

    React.useEffect(() => {
        register({ name: 'grupo' });
        register({ name: 'forn' });
        register({ name: 'marca' });
        register({ name: 'unidade_medida' });
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
                        <SelectRowLabel
                            placeholder={marcaLabel}
                            {...marcaInputProps}
                            options={brandOptions}
                            value={brand.selectedOption}
                            onChange={target => handleChange(target, 'marca', setBrand)}
                        />
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <SelectRowLabel
                            placeholder={fornLabel}
                            {...fornInputProps}
                            value={forns.selectedOption}
                            onChange={target => handleChange(target, 'forn', setForn)}
                            options={fornOptions}
                        />
                    </Card>
                </Col>
                <Col xl={3} lg={12} md={12}>
                    <Card>
                        <SelectAsync
                            placeholder={groupLabel}
                            {...groupInputProps}
                            options={[{ id: 1, name: 'Teste' }]}
                            onChange={target => handleChange(target, 'grupo', setGroupValue)}
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
                        <InputForm
                            label={vlrCompraLabel}
                            value={priceBuy}
                            onChange={target => handleChangeMoney(target, setPriceBuy, 'priceBuy')}
                            {...vlrCompraInputProps}
                            innerRef={register}
                        />
                    </Card>
                </Col>
                <Col xl={3} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={vlrVendaLabel}
                            value={priceSale}
                            onChange={target => handleChangeMoney(target, setPriceSale, 'priceSale')}
                            {...vlrVendaInputProps}
                            innerRef={register}
                        />
                    </Card>
                </Col>
                <Col xl={2} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={margenLabel}
                            value={margem}
                            {...margenInputProps}
                            innerRef={register}
                        />
                    </Card>
                </Col>
                <Col xl={2} lg={12} md={12}>
                    <Card>
                        <SelectAsync
                            placeholder="Uni"
                            options={[{ id: 1, name: 'KG' }, {id:2, name: 'UNID'}]}
                            value={uni.selectedOption}
                            onChange={target => handleChange(target, 'unidade_medida', setUni)}
                        />
                    </Card>
                </Col>
                <Col xl={2} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label="Unidade valor"
                            {...uniInputProps}
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
        id: 'descr',
        name: 'descr',
    },
    marcaLabel: 'Marca',
    marcaInputProps: {
        id: 'marca'

    },
    fornLabel: 'Fornecedor',
    fornInputProps: {
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
    uniInputProps: {
        id: 'unidade_valor',
        name: 'unidade_valor',
    },
    btnLabelSubmit: 'Salvar',
    btnLabelCancel: 'Cancelar',
};

export default FormProduct;