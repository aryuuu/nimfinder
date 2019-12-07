
// list of all possible operators combinations
const ops = [
  [ '+', '+', '+' ], [ '+', '+', '-' ], [ '+', '+', '*' ],
  [ '+', '+', '/' ], [ '+', '-', '+' ], [ '+', '-', '-' ],
  [ '+', '-', '*' ], [ '+', '-', '/' ], [ '+', '*', '+' ],
  [ '+', '*', '-' ], [ '+', '*', '*' ], [ '+', '*', '/' ],
  [ '+', '/', '+' ], [ '+', '/', '-' ], [ '+', '/', '*' ],
  [ '+', '/', '/' ], [ '-', '+', '+' ], [ '-', '+', '-' ],
  [ '-', '+', '*' ], [ '-', '+', '/' ], [ '-', '-', '+' ],
  [ '-', '-', '-' ], [ '-', '-', '*' ], [ '-', '-', '/' ],
  [ '-', '*', '+' ], [ '-', '*', '-' ], [ '-', '*', '*' ],
  [ '-', '*', '/' ], [ '-', '/', '+' ], [ '-', '/', '-' ],
  [ '-', '/', '*' ], [ '-', '/', '/' ], [ '*', '+', '+' ],
  [ '*', '+', '-' ], [ '*', '+', '*' ], [ '*', '+', '/' ],
  [ '*', '-', '+' ], [ '*', '-', '-' ], [ '*', '-', '*' ],
  [ '*', '-', '/' ], [ '*', '*', '+' ], [ '*', '*', '-' ],
  [ '*', '*', '*' ], [ '*', '*', '/' ], [ '*', '/', '+' ],
  [ '*', '/', '-' ], [ '*', '/', '*' ], [ '*', '/', '/' ],
  [ '/', '+', '+' ], [ '/', '+', '-' ], [ '/', '+', '*' ],
  [ '/', '+', '/' ], [ '/', '-', '+' ], [ '/', '-', '-' ],
  [ '/', '-', '*' ], [ '/', '-', '/' ], [ '/', '*', '+' ],
  [ '/', '*', '-' ], [ '/', '*', '*' ], [ '/', '*', '/' ],
  [ '/', '/', '+' ], [ '/', '/', '-' ], [ '/', '/', '*' ],
  [ '/', '/', '/' ]
];


/**
 * @param  {list of integers}
 * @return {list of list of integers}
 * returns lists of all possible permutation in nums
 */
function combineNumbers(nums) {

	var result = [];

	
	const len = nums.length;

	for (let a = 0; a < len; a++) {
		for (let b = 0; b < len; b++) {
			for (let c = 0; c < len; c++) {
				for (let d = 0; d < len; d++) {
					
					if (a == b || a == c || a == d || b == c || b == d || c == d) {
						continue;
					}

					let temp = []
					temp.push(nums[a]);
					temp.push(nums[b]);
					temp.push(nums[c]);
					temp.push(nums[d]);

					result.push(temp);

				}
			}
		}
	}

	return result;


}

/**
 * @return {list of list of operators}
 */
function combineOperators() {

	var result = [];

	var ops = '+-*/';
	var len = ops.length;

	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len; j++) {
			for (let k = 0; k < len; k++) {
				
				let temp = []
				temp.push(ops[i]);
				temp.push(ops[j]);
				temp.push(ops[k]);

				result.push(temp);

			}
		}
	}

	return result;
}


/**
 * @param  {list of integers}
 * @return {list of solutions}
 * all elements in nums in assumed to be a valid integer
 */
function evaluate(nums) {

	var result = [];
	nums = combineNumbers(nums);

	nums.forEach(n => {
		// patterns of parentheses
		// (ab)(cd)
		// (a(bc))d
		// ((ab)c)d
		// a((bc)d) 
		for (let i = 0; i < 4; i++) {

			ops.forEach(o => {
				var exp = '';
				if (i == 0) { //eval this pattern >> (ab)(cd)
					exp = `(${n[0]}${o[0]}${n[1]})${o[1]}(${n[2]}${o[2]}${n[3]})`;

				} else if ( i == 1) { //eval this pattern >> (a(bc))d
					exp = `(${n[0]}${o[0]}(${n[1]}${o[1]}${n[2]}))${o[2]}${n[3]}`;

				} else if ( i == 2) { //eval this pattern >> ((ab)c)d
					exp = `((${n[0]}${o[0]}${n[1]})${o[1]}${n[2]})${o[2]}${n[3]}`;

				} else if ( i == 3 ) { //eval this pattern >> a((bc)d)
					exp = `${n[0]}${o[0]}((${n[1]}${o[1]}${n[2]})${o[2]}${n[3]})`;

				}

				if (eval(exp) == 24 && result.indexOf(exp) == -1) {
						result.push(exp);
					}
			})
		}
	})


	return result;
}




// module.exports.combineNumbers = combineNumbers;
// module.exports.combineOperators = combineOperators;
module.exports.evaluate = evaluate;