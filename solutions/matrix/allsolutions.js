var result = [];
module.exports = {
	minus: function(matrixA, matrixB) {
	  result = [];
	  matrixA.forEach(function(el, i) {
	    result[i] = [];
	    matrixA[0].forEach(function(element, index) {
	      result[i][index] = parseFloat(matrixA[i][index]) - parseFloat(matrixB[i][index]);
	    });
	  });
	  return result;
	},
	sum: function(matrixA, matrixB) {
	  result = [];
	  matrixA.forEach(function(el, i) {
	    result[i] = [];
	    matrixA[0].forEach(function(element, index) {
	      result[i][index] = parseFloat(matrixA[i][index]) + parseFloat(matrixB[i][index]);
	    });
	  });
	  return result;
	},
	multiply: function(matrixA, matrixB) {
	  result = [];
	  matrixA.forEach(function(element, i) {
	    result[i] = [];
	    matrixB[0].forEach(function(el, j) {
	      result[i][j] = 0;
	      matrixA[0].forEach(function(elem, k) {
	        result[i][j] += +(matrixA[i][k] * matrixB[k][j]);
	      });
	    });
	  });
	  return result;
	}
}