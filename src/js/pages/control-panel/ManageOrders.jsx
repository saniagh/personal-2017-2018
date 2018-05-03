import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Checkbox, Button, Popconfirm, Spin, Select, Input } from 'antd';
const Option = Select.Option;

import ReactTable from 'react-table';
import 'react-table/react-table.css';

class ManageOrders extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mainClassName: 'main-container hidden',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        mainClassName: 'main-container',
      });
    }, 100);
  }

  render() {

    const columns = [
      {
        Header: 'Select',
        maxWidth: 46,
        accessor: '_id',
        Cell: props => <Checkbox
            onChange={() => this.props.onSelect(props.value)}/>,
      },
      {
        Header: 'Order',
        accessor: '_id',
        Cell: props => <Link
            to={`/control-panel/orders-management/order/${props.value}`}>{props.value}</Link>,
      },
      {
        Header: 'Client last name',
        accessor: 'lastName',
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
      },
      {
        Header: 'Status',
        accessor: 'currentStatus',
        Cell: props => <span style={
          props.value === 'ORDERED' ? { color: 'green' }
              :
              { color: '#10B2F8' }
        }>{props.value}</span>,
      },
      {
        Header: 'Ship to',
        columns: [
          {
            Header: 'Country',
            accessor: 'country',
            Cell: props => <span>{props.value.charAt(0).toUpperCase() +
            props.value.slice(1)}</span>,
          },
          {
            Header: 'City',
            accessor: 'townOrCity',
          },
          {
            Header: 'Full Home Address',
            accessor: 'fullHomeAddress',
          },
          {
            Header: 'Postal Code',
            accessor: 'postcodeOrZIP',
          },
        ],
      },
      {
        Header: 'Total',
        accessor: 'totalCost',
        Cell: props => <span>{this.props.currency[1]}{props.value}</span>,
      },
      {
        Header: 'Actions',
        accessor: 'currentStatus',
        Cell: props => <span>
          {props.value === 'ORDERED' ?
              <Popconfirm placement="top"
                          title="Are you sure about this?"
                          onConfirm={() => this.props.onCompleteOrder(
                              props.original._id)}>
                <Button icon="check"/>
              </Popconfirm>
              :
              null
          }
        </span>,
      },
    ];

    return (
        <div className={this.state.mainClassName}>
          <Spin tip="Fetching orders..."
                size="large"
                spinning={this.props.fetchingOrders}>
            <Card noHovering={true}
                  bordered={false}>
              <div className="manage-orders-top-actions-container">
                <div className="manage-orders-top-actions">
                  <Select defaultValue="Bulk Actions"
                          placeholder="Select a country..."
                          style={{
                            width: 150,
                          }}
                          onChange={this.props.onChangeBulkAction}>
                    <Option key="Mark as completed">
                      Mark as completed
                    </Option>
                  </Select>
                  <Button style={{ marginLeft: 5 }}
                          onClick={this.props.onExecuteBulkAction}
                          disabled={this.props.selected.length === 0}>
                    Apply
                  </Button>
                </div>
                <div className="manage-orders-filter">
                  <Input placeholder="Search customer"
                         value={this.props.searchQuery}
                         onChange={this.props.onSearchQueryChange}
                         onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                             this.props.onFilterOrders();
                           }
                         }}/>
                  <Button style={{ marginLeft: 5 }}
                          onClick={this.props.onFilterOrders}>
                    Filter
                  </Button>
                </div>
              </div>
              <ReactTable data={this.props.showingFilteredOrders ?
                  this.props.filteredOrders :
                  this.props.orders}
                          defaultPageSize="5"
                          columns={columns}/>
              <div className="manage-orders-top-actions-container">
                <div className="manage-orders-top-actions">
                  <Select defaultValue="Bulk Actions"
                          placeholder="Select a country..."
                          style={{
                            width: 150,
                          }}
                          onChange={this.props.onChangeBulkAction}>
                    <Option key="Mark as completed">
                      Mark as completed
                    </Option>
                  </Select>
                  <Button style={{ marginLeft: 5 }}
                          onClick={this.props.onExecuteBulkAction}
                          disabled={this.props.selected.length === 0}>
                    Apply
                  </Button>
                </div>
                <div className="manage-orders-filter">
                  <Input placeholder="Search customer"
                         value={this.props.searchQuery}
                         onChange={this.props.onSearchQueryChange}
                         onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                             this.props.onFilterOrders();
                           }
                         }}/>
                  <Button style={{ marginLeft: 5 }}
                          onClick={this.props.onFilterOrders}>
                    Filter
                  </Button>
                </div>
              </div>
            </Card>
          </Spin>
        </div>
    );
  }
}

export default ManageOrders;
