import React from 'react';
import { Fab } from 'react-tiny-fab';
import { MdAdd } from 'react-icons/md';
import Filter from './Filter';
import DataTable from '../../Utils/DataTable';

class BrandList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { resetPaginationToggle: false };
    }

    render() {
        const {
            data,
            columns,
            handleNavigation,
            onSubmitFilter,
            cleanFilter,
            fornList,
            loadingFilter,
        } = this.props;

        const { resetPaginationToggle } = this.state;

        if (data.colunasItem) {
            var tableColumn = data.colunasItem.map(index => {
                return (
                    <th key={index}>{index}</th>
                )
            })
            var tableValues = data.valuesItem.map(index => {
                return (
                    <tr>
                        {index.map(i => {return(<th key={i}>{i}</th>)})}
                    </tr>
                )
            })
        }


        let fornOptions = fornList.map(index => ({
            id: index.id,
            name: index.forn
        }))
        return (
            <div>
                <Filter
                    forns={fornOptions}
                    onSubmit={values => {
                        onSubmitFilter(values);
                        this.setState({
                            resetPaginationToggle: !resetPaginationToggle,
                        });
                    }}
                />
               

            
                <DataTable
                    loading={loadingFilter}
                    columns={columns}
                    data={data}
                    paginationResetDefaultPage={resetPaginationToggle}
                    pagination={data.length > 10}
                />
                
                <Fab
                    mainButtonStyles={{
                        backgroundColor: '#5686E1',
                    }}
                    position={{ bottom: 15, right: 0 }}
                    event="click"
                    icon={<MdAdd />}
                    onClick={() => handleNavigation('/brands/add')}
                    text="Adicionar Marca"
                />
            </div>
        );
    }
}



BrandList.defaultProps = {};

export default BrandList;
