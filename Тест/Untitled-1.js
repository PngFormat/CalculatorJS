(function() {
        "use strict";
    
        // Shortcut to get elements
        var el = function(element) {
        if (element.charAt(0) === "#") { // If passed an ID...
            return document.querySelector(element); // ... returns single element
        }
    
        return document.querySelectorAll(element); // Otherwise, returns a nodelist
        };
    

    var viewer = el("#viewer"), // Calculator screen where result is displayed
        equals = el("#equals"), // Equal button
        nums = el(".num"), // List of numbers
        ops = el(".ops"), // List of operators
        theNum = "", // Current number
        oldNum = "", // First number
        resultNum, // Result
        operator; // Choose operation in calculator


    var getValue = function(){
        if (resultNum)
        {
            theNum = this.getAttribute("data-num");
            resultNum = "";
        }
        else
        {
            theNum += this.getAttribute("data-num");
        }
        viewer.innerHTML = theNum;
    };
    // Add click event to numbers
    var moveNum = function() {
      oldNum = theNum;
      theNum = "";
      operator = this.getAttribute("data-ops");
  
      equals.setAttribute("data-result", ""); // Reset result in attr
    };

    var displayNum = function(){
      oldNum = parseFloat(oldNum);
      theNum = parseFloat(theNum);

      switch(operator){
        case 'plus':
          resultNum = oldNum + theNum;
          break;
        case 'minus':
          resultNum = oldNum - theNum;
          break;
        case 'times':
          resultNum = oldNum * theNum;
          break;
        case 'divided by':
          resultNum = oldNum / theNum;
          break;

        default:
          resultNum = theNum;
        
      }

      if(!isFinite(resultNum)){
        if(isNaN(resultNum)){
          resultNum = 'This doesnt calculated!';
        }
        else
        {
          resultNum = 'Look the resultNum';
          el('#calculator').classList.add('broken');
          el('#reset').classList.add('show');
        }
      }
      viewer.innerHTML = resultNum;
      equals.setAttribute("data-result", resultNum);
  
      // Now reset oldNum & keep result
      oldNum = 0;
      theNum = resultNum;

    };



    var clearViewer = function(){
        oldNum = "";
      theNum = "";
      viewer.innerHTML = "0";
      equals.setAttribute("data-result", resultNum);
    };
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = getValue;
  }

  // Add click event to operators
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  // Add click event to equal sign
  equals.onclick = displayNum;

  // Add click event to clear button
  el("#clear").onclick = clearViewer;

  // Add click event to reset button
  el("#reset").onclick = function() {
    window.location = window.location;
  };

  
}
());


