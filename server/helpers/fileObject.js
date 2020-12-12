
import fileTypeLimits from '../constants/fileType';

const nameIndex = 2;
const keyIndex = 0;
const valueIndex = 1;

const getFileType = (extention) => {
	const fileTypesArr = Object.entries(fileTypeLimits);
	let i = keyIndex;
	let result;

	for (i; i < fileTypesArr.length; i++) {
		if (fileTypesArr[i][valueIndex].includes(extention)) {
			result = fileTypesArr[i][keyIndex];
		}
	}
	return result;
};

const getFileObject = (file) => {
	const fileNameArr = file.originalname.split('.');
	const name = fileNameArr[fileNameArr.length - nameIndex];
	const extension = fileNameArr[fileNameArr.length - valueIndex];
	const type = getFileType(extension);
	const fileObject = {
		name,
		type,
		extension,
	};

	return fileObject;
};

export default getFileObject;