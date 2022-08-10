function cleanup(data) {
  data.forEach((entry) => {
    Object.keys(entry).forEach((key) => {
      if (Array.isArray(entry[key])) {
        entry[key] = entry[key].map((v) => decodeURIComponent(v));
      } else {
        entry[key] = decodeURIComponent(entry[key]);
      }
    });
  });

  return data;
}

export default cleanup;
