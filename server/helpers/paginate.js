const itemsPerPage = 5;

const paginate = (data, page) => {
  page = +page;
  const result = {
    total: data.length,
    page,
  };
  if (data.length < itemsPerPage) {
    return {
      data,
      ...result,
    };
  } else {
    const skip = page * itemsPerPage;
    const paged = data.slice(skip, skip + 10 > data.length - 1 ? data.length - 1 : skip + 10);
    return {
      data: paged,
      ...result,
    };
  }
};

export default paginate;
