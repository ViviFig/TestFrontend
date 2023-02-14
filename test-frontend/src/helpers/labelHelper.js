import labels from '../data/labels.json'

const labelsHelper = (string) => {
  let label = labels[string];
  return label;
};

export default labelsHelper;
