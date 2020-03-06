import React, { Component,useState } from 'react';
import { Button,Form, Input, Select,Table, Tag } from 'antd';
import './App.css';
const { Option } = Select;
const PriceInput = ({ value = {}, onChange }) => {
	const [number, setNumber] = useState(0);
	const [currency, setCurrency] = useState('rmb');

	const triggerChange = changedValue => {
		debugger;
		if (onChange) {
			onChange({
				number,
				currency,
				...value,
				...changedValue,
			});
		}
	};

	const onNumberChange = e => {
		debugger;
		const newNumber = parseInt(e.target.value || 0, 10);

		if (Number.isNaN(number)) {
			return;
		}

		if (!('number' in value)) {
			setNumber(newNumber);
		}

		triggerChange({
			number: newNumber,
		});
	};

	const onCurrencyChange = newCurrency => {
		debugger;
		if (!('currency' in value)) {
			setCurrency(newCurrency);
		}

		triggerChange({
			currency: newCurrency,
		});
	};

	return (
		<span>
      <Input
		  type="text"
		  value={value.number || number}
		  onChange={onNumberChange}
		  style={{
			  width: 100,
			  marginRight: 8,
		  }}
	  />
      <Select
		  value={value.currency || currency}
		  style={{
			  width: 80,
		  }}
		  onChange={onCurrencyChange}
	  >
        <Option value="rmb">RMB</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </span>
	);
};

const Demo = () => {
	const onFinish = values => {
		debugger;
		console.log('Received values from form: ', values);
	};

	const checkPrice = (rule, value) => {
		if (value.number > 0) {
			return Promise.resolve();
		}

		return Promise.reject('Price must be greater than zero!');
	};

	return (
		<Form
			name="customized_form_controls"
			layout="inline"
			onFinish={onFinish}
			initialvalues={{
				price: {
					number: 0,
					currency: 'rmb',
				},
			}}
		>
			<Form.Item
				name="price"
				label="Price"
				rules={[
					{
						validator: checkPrice,
					},
				]}
			>
				<PriceInput />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};



const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: text => <a>{text}</a>,
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Tags',
		key: 'tags',
		dataIndex: 'tags',
		render: tags => (
			<span>
        {tags.map(tag => {
			let color = tag.length > 5 ? 'geekblue' : 'green';
			if (tag === 'loser') {
				color = 'volcano';
			}
			return (
				<Tag color={color} key={tag}>
					{tag.toUpperCase()}
				</Tag>
			);
		})}
      </span>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: (text, record) => (
			<span>
        <a style={{ marginRight: 16 }}>Invite {record.name}</a>
        <a>Delete</a>
      </span>
		),
	},
];

const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
];




class App extends Component {
render() {
  return (
	<div className="App">
	  <Button type="primary">Button</Button>
		<Demo/>
		<Table columns={columns} dataSource={data} />
	</div>
  );
}
}

export default App;



