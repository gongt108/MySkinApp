import React from 'react';
import axios from 'axios';
import { Text, Spacer, Input, Button } from '@nextui-org/react';
import Link from 'next/link';

const Brands = (props) => {
	const test = [...new Set(props.data.map((product) => product.brand))];

	const convertArrayToObject = (array, key) => {
		const initialValue = {};
		return array.reduce((obj, key) => {
			// console.log(obj);
			return {
				...obj,
				[key[0]]: [...(obj[key[0]] || []), key],
			};
		}, initialValue);
	};

	const test2 = convertArrayToObject(test, test.brand);

	// console.log(test2);
	return (
		<div className="p-8">
			{Object.keys(test2)
				.sort()
				.map((k, v) => {
					return (
						<div key={k} className="flex flex-col">
							<Text h1 size={20} weight="bold">
								{k}
							</Text>
							<hr className="my-2" />
							{test2[k].map((brand, index) => (
								<Link
									className="mb-1 text-gray-500 hover:underline hover:text-gray-400"
									href={`/brand/${brand}`}
									key={index}
								>
									{brand}
								</Link>
							))}
							<Spacer y={1.2} />
						</div>
					);
				})}
		</div>
	);
};

export const getServerSideProps = async () => {
	const res = await axios.get('http://localhost:8082/api/products');

	return {
		props: { data: res.data },
	};
};

export default Brands;
