document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("input").focus();
})
document.addEventListener('keydown', function () {
  let keyCode = event.keyCode;
  if (keyCode == 13) {
    Equals();
  }
})

inputNum = c => {
  let e = document.getElementById("input");
  let pos = e.selectionStart;
  var before = e.value.substr(0, pos);
  var word = document.getElementById(c).textContent;
  var after = e.value.substr(pos, e.value.length);
  e.value = before + word + after;
  document.getElementById("input").focus();
  e.setSelectionRange(pos + 1, pos + 1)

}

allClear = () => {
  let e = document.getElementById("input");
  e.value = '';
}

Equals = () => {
  let e = document.getElementById("input");
  let formula = e.value;

  formula = formula.replace(/\s+/, "");//文字列から空白を削除
  formula = formula.split(/([\-\+\*\/%])/);//数式記号を含めて分割

  console.log(formula);

  let reversePolishFormula = [];
  let stack = [];

  for (term of formula) {
    if (term.match(/\d+(?:\.\d+)?/)) {
      reversePolishFormula.push(term);
    }
    else if (term.match(/[\-\+\*\/%]/)) {
      while (compareOperator(stack[stack.length - 1], term)) {
        reversePolishFormula.push(stack.pop());
      }
      stack.push(term);
    }
  }
  for (let i = 0; i < stack.length; i++) {
    reversePolishFormula.push(stack.pop());
  }

  console.log(formula);
  console.log(reversePolishFormula);

  e.value = calculateReversePolishFormula(reversePolishFormula);
}

calculateReversePolishFormula = (rpf) => {

  //console.log(rpf);
  //console.log(rpf.length);


  let stack = [];
  rpf.forEach(function (term, index) {
    if (term.match(/\d/g)) {
      stack.push(rpf[index]);
    }
    else if (term.match(/[\(\)\-\+\*\/%]/)) {
      let t2 = stack.pop();
      let t1 = stack.pop();
      let result;

      switch (term) {
        case '+':
          result = parseFloat(t1) + parseFloat(t2);
          break;
        case '-':
          result = parseFloat(t1) - parseFloat(t2);
          break;
        case '*':
          result = parseFloat(t1) * parseFloat(t2);
          break;
        case '/':
          result = parseFloat(t1) / parseFloat(t2);
          break;
        case '%':
          result = parseFloat(t1) % parseFloat(t2);
          break;

        default:
          return NaN;
          break;
      }
      stack.push(result);
    }
    //console.log(stack)
  });
  return stack[stack.length - 1];
}

compareOperator = (o1, o2) => {
  let priority = new Map();
  priority.set('+', 0);
  priority.set('-', 0);
  priority.set('*', 1);
  priority.set('/', 2);
  priority.set('%', 2);

  if (priority.get(o1) >= priority.get(o2)) {
    return true;
  }
  return false;
}