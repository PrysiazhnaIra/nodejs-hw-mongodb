export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType =
    typeof type === 'string' && ['work', 'home', 'personal'].includes(type)
      ? type
      : undefined;
  const parsedIsFavourite =
    typeof isFavourite === 'string' ? isFavourite === 'true' : undefined;

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
