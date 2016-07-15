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
	},
	det: function(matrix, length) {
	  function determinant(A, N) {
	    var det = 0;
	    if (N == 1) {
	      det = A[0][0];
	    } else if (N == 2) {
	      det = A[0][0] * A[1][1] - A[1][0] * A[0][1];
	    } else {
	      det = 0;
	      for (var j1 = 0; j1 < N; j1++) {
	        var m = [];
	        for (var k = 0; k < (N - 1); k++) {
	          m[k] = [];
	        }
	        for (var i = 1; i < N; i++) {
	          var j2 = 0;
	          for (var j = 0; j < N; j++) {
	            if (j == j1)
	              continue;
	            m[i - 1][j2] = A[i][j];
	            j2++;
	          }
	        }
	        det += Math.pow(-1.0, 1.0 + j1 + 1.0) * A[0][j1] * determinant(m, N - 1);
	      }
	    }
	    return det;
	  }
	  return determinant(matrix, length);
	}
}