export const ValidateAddMenu = ({
  nameRef,
  category,
  size,
  stockRef,
  priceRef,
  costRef,
  setErrors,
}) => {
  const errors = {};
  if (!nameRef.current.value.trim()) {
    errors.name = "Food is required";
  }
  if (!category) {
    errors.category = "Category is required";
  }
  if (!size) {
    errors.size = "Size is required";
  }
  if (!stockRef.current.value.trim()) {
    errors.stock = "Stock is required";
  }
  if (!costRef.current.value.trim()) {
    errors.cost = "Cost is required";
  }
  if (!priceRef.current.value.trim()) {
    errors.price = "Price is required";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};
