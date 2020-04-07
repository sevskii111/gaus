const eps = 0.00001;

export const solveGaus = matrix => {
  let result = [];

  let y = matrix.map(l => l[l.length - 1]);

  let n = matrix.length;
  let max, k, index;

  k = 0;
  while (k < n) {
    max = Math.abs(matrix[k][k]);
    index = k;
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(matrix[i][k]) > max) {
        max = Math.abs(matrix[i][k]);
        index = i;
      }
    }
    if (max < eps) {
      return false;
    }
    for (let j = 0; j < n; j++) {
      const temp = matrix[k][j];
      matrix[k][j] = matrix[index][j];
      matrix[index][j] = temp;
    }
    const temp = y[k];
    y[k] = y[index];
    y[index] = temp;
    for (let i = k; i < n; i++) {
      const temp = matrix[i][k];
      if (Math.abs(temp) < eps) continue;
      for (let j = 0; j < n; j++) matrix[i][j] = matrix[i][j] / temp;
      y[i] = y[i] / temp;
      if (i == k) continue;
      for (let j = 0; j < n; j++) matrix[i][j] = matrix[i][j] - matrix[k][j];
      y[i] = y[i] - y[k];
    }
    k++;
  }
  for (k = n - 1; k >= 0; k--) {
    result[k] = y[k];
    for (let i = 0; i < k; i++) y[i] = y[i] - matrix[i][k] * result[k];
  }

  return result;
};
