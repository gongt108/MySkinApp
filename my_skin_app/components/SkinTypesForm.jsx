import React, { useState } from 'react';
import securityQuestions from '../constants/securityQuestions';
import {
	Input,
	Button,
	Text,
	Spacer,
	Radio,
	Checkbox,
} from '@nextui-org/react';

const SkinTypesForm = (props) => {
	return (
		<div>
			<Radio.Group
				label="Skin Type"
				value={props.selectedSkinType}
				onChange={props.setSelectedSkinType}
			>
				<Radio value="dry">Dry</Radio>
				<Radio value="combinationDry">Combination-Dry</Radio>
				<Radio value="normal">Normal</Radio>
				<Radio value="combinationOily">Combination-Oily</Radio>
				<Radio value="oily">Oily</Radio>
			</Radio.Group>
			<Spacer y={2} />
			<Checkbox.Group
				label="Other Skin Types (Optional)"
				value={props.selectedSkinTypeOptional}
				onChange={props.setSelectedSkinTypeOptional}
			>
				<Checkbox value="sensitive">Sensitive</Checkbox>
				<Checkbox value="acne-prone">Acne Prone</Checkbox>
			</Checkbox.Group>
		</div>
	);
};

export default SkinTypesForm;
