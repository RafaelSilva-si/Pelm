import React, { useState } from 'react';
import { Button, Row, Col,  } from 'reactstrap';
import { InputForm, SelectInput, SelectRowLabel, InputLabel } from '../../Utils';
import { useForm } from 'react-hook-form';
import Card from '../../Utils/Card/FormCard';

const FormBrand = ({
    brand,
    onSubmit,
    handleNavigation,
    nameLabel,
    nameInputProps,
    fornLabel,
    fornInputProps,
    forn,
    btnLabelSubmit,
    btnLabelCancel,
    ...restProps
}) => {

    const { register, handleSubmit, setValue, } = useForm({
        defaultValues: brand,
    });

    if(brand){
        var fornOptionSelected = {id: brand.forn, name: brand.fornname}
    }
    const [forns, setForn] = useState({selectOption: fornOptionSelected})
    const handleChangeForn = selectedOption => {
		setValue('forn', selectedOption.id);
		setForn({ selectedOption });
	};

    if(forn){
        var fornOptions = forn.map(index => ({
            id: index.id,
            name: index.forn
        }))
    }
    

    React.useEffect(() => {
        register({ name: 'forn' });
    }, [register]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} {...restProps}>
            <Row style={{ marginTop: '40px' }}>
                <Col xl={6} lg={12} md={12}>
                    <Card>
                        <SelectRowLabel
                            label={fornLabel}
                            {...fornInputProps}
                            options={fornOptions}
                            value={forns.selectOption}
                            onChange={handleChangeForn}
                        />
                    </Card>
                </Col>
                <Col xl={6} lg={12} md={12}>
                    <Card>
                        <InputForm
                            label={nameLabel}
                            {...nameInputProps}
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

FormBrand.defaultProps = {
    fornLabel: 'Fornecedor',
    fornInputProps :{
        placeholder: 'Selecione o Fornecedor...'
    },
    nameLabel: 'Nome',
    nameInputProps: {
        name: 'name',
        id: 'name',
    },
    btnLabelSubmit: 'Salvar',
    btnLabelCancel: 'Cancelar',
};

export default FormBrand;