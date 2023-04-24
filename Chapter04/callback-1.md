# 콜백 함수

 **01 콜백 함수란**

- 콜백 함수: 다른 코드의 인자를 넘겨줌으로써 그 제어권도 함께 위임한 함수
    - 콜백 함수를 넘겨받은 코드는 이 콜백 함수를 필요에 따라 적절한 시점에 실행한다.
    - 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수
    - 고차 함수 (Higher-order Function): 매개 변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수
    - 콜백 함수는 고차 함수에 전달되어 헬퍼 함수 역할을 한다.
    - 고차 함수는 콜백 함수를 자신의 일부분으로 합성한다.
    - 고차함수는 매개변수를 통해 전달받은 콜백 함수의 호출 시점을 결정해서 호출한다. 다시 말해, 콜백 함수는 고차 함수에 의해 호출되며 이때 고차 함수는 필요에 따라 콜백 함수에 인수를 전달할 수 있다.
- callback = call (부르다, 호출/실행하다) + back (되돌다) ⇒ 되돌아 호출해달라
    - 어떤 함수 X를 호출하면서 “특정 조건일 때 함수 Y를 실행해서 나에게 알려달라”는 요청을 보낸다.
    - 이 요청을 받은 함수 X의 입장에서는 해당 조건이 갖춰졌는지 여부를 스스로 판단하고 Y를 직접 호출한다
- 예시: 시계
    - 함수 A = 수시로 시간을 구하는 함수를 직접 호출한다.
        - 시계 함수의 제어권은 A한테 있다.
    - 함수 B = 시계의 알람을 설정하는 함수를 호출하고 해당 함수는 호출 당시에는 아무것도 하지 않다가 B가 정해준 시각이 됐을 때 알람을 울리는 결과를 반환한다.
        - 알람을 울리는 명령에 대한 제어권을 시계한테 넘겨준다.
- 코드 예시: repeat 함수
    
    ```jsx
    // n만큼 어떤 일을 반복한다. 
    function repeat1(n) {
    	// i를 출력한다. 
    	for (let i = 0; i < n; i++) {
    		console.log(i);
    	}
    }
    repeat1(5);   // 0 1 2 3 4 
    
    // n만큼 어떤 일을 반복한다. 
    function repeat2(n) {
    	// i가 홀수일 때만 출력한다. 
    	for (let i = 0; i < n; i++) {
    		if(i % 2) console.log(i);
    	}
    }
    repeat2(5);   // 1 3
    ```
    
    - 반복하는 일은 변하지 않고 공통적으로 수행하지만 반복하면서 하는 일의 내용은 다르기 때문에 매번 함수를 새롭게 정의해야 한다. 이 문제를 함수를 합성하는 것으로 해결할 수 있다. 함수의 변하지 않는 공통 로직은 미리 정의해 두고, 경우에 따라 변경되는 로직은 추상화해서 함수 외부에서 함수 내부로 전달하는 것이다.
    
    ```jsx
    // 외부에서 전달받은 f를 n만큼 반복 호출한다. 
    function repeat(n, f) {
    	for (let i = 0; i < n; i++) {
    		f(i);  // i를 전달하면서 f를 호출
    	}
    }
    
    let logAll = function(i) {
    	console.log(i);
    };
    repeat(5, logAll); // 0 1 2 3 4
    
    let logOdds = function(i) {
    	if(i % 2) console.log(i);
    };
    repeat(5, logOdds); // 1 3 
    ```
    
    - 모든 콜백 함수가 고차 함수에 의해 호출되는 것은 아니다.
        - ex) setTimeout 함수의 콜백 함수는 setTimeout 함수가 호출하지 않는다.
- 콜백 함수 정의 방법
    - 콜백 함수가 고차 함수 내부에만 호출된다면 콜백 함수를 익명 함수 리터럴로 정의하면서 곧바로 고차 함수에 전달하는 것이 일반적이다.
        
        ```jsx
        repeat(5, function(i) {
        	if(i % 2) console.log(i);
        });
        ```
        
        - 이때 콜백함수로서 전달된 함수 리터럴은 고차 함수가 호출될 때마다 평가되어 함수 객체를 생성한다
    - 콜백 함수를 다른 곳에서 호출할 필요가 있거나, 콜백 함수를 전달받는 함수가 자주 호출된다면 함수 외부에서 콜백 함수를 정의한 후 함수 참조를 고차 함수에 전달하는 편이 효율적이다
        
        ```jsx
        let logOdds = function(i) {
        	if(i % 2) console.log(i);
        };
        repeat(5, logOdds); // 1 3 
        ```
        
        - 이 예제의 logOdds 함수는 단 한 번만 생성된다.

 **02 제어권**

### **4-2-1 호출 시점**

- 콜백 함수를 호출하는 시점을 스스로 판단해서 실행한다.
- setInterval
    
    ```jsx
    var intervalID = scope.setInterval(func, delay[, param1, param2, ...]);
    ```
    
    - scope = Window OR Woker
    - func = 넘겨줄 콜백 함수
    - delay = 콜백함수가 실행될 특정 시간 간격 (ms) (생략가능)
    - [, param1, param2, ...] = func 함수를 실행할 때 매개변수로 전달할 인자
- 콜백 함수 예시
    
    ```jsx
    var count = 0;
    var cbFunc = function() {
    	console.log(count);
    	if (++count > 4) clearInterval(timer);
    };
    var timer = setInterval(cbFunc, 300);
    
    // -- 실행 결과 --
    // 0 (0.3초)
    // 1 (0.6초)
    // 2 (0.9초)
    // 3 (1.2초)
    // 4 (1.5초)
    ```
    
    - 첫번째 인자인 cbFunc 함수는 0.3초마다 자동으로 실행된다.
    - 콜백 함수 내부에서 count 값을 출력하고, count를 1만큼 증가시킨 다음 그값이 4보다 크면 반복 실행을 종료한다.
    - setInterval이라고 하는 다른 코드에 첫 번째 인자로서 cbFunc 함수를 넘겨주자 제어권을 넘겨받은 setInterval이 스스로의 판단에 따라 적절한 시점에 익명 함수를 실행한다.
        
        
        | code | 호출 주체 | 제어권 |
        | --- | --- | --- |
        | cbFunc(); | 사용자 | 사용자 |
        | setInterval(cbFunc, 300); | setInterval | setInterval |
        
        ⇒ 콜백 함수의 제어권을 넘겨받은 코드는 콜백 함수 호출 시점에 대한 제어권을 가진다. 
        

### **4-2-2 인자**

- 콜백 함수를 호출할 때 인자로 넘겨줄 값들 및 그 순서가 정해져 있다. 이 순서를 따르지 않고 코드를 작성하면 엉뚱한 결과를 얻게 된다.
- Array.prototype.map
    
    ```jsx
    Array.prototype.map(callback[, thisArg])
    callback: function(currentValue, index, array)
    ```
    
    - 메서드의 대상이 되는 배열의 모든 요소들을 처음부터 끝까지 하나씩 꺼내어 콜백 함수를 반복 호출하고 콜백 함수의 실행 결과들을 모아 새로운 배열을 만든다.
    - 콜백 함수의 인자들: 배열의 요소 중 현재값, 현재값의 인덱스, map 메서드의 대상이 되는 배열 자체
- 순서대로 인자를 넣었을 때의 사용 예시
    
    ```jsx
    var newArr = [10, 20, 30].map(function(currentValue, index) {
    	console.log(currentValue, index);
    	return currentValue + 5;
    });
    console.log(newArr);
    
    // -- 실행 결과 --
    // 10 0 
    // 20 1
    // 30 2
    // [15, 25, 35]
    ```
    
- 인자의 순서를 임의로 바꾸어 사용한 경우
    
    ```jsx
    var newArr2 = [10, 20, 30].map(function(index, currentValue) {
    	console.log(index, currentValue);
    	return currentValue + 5;
    });
    console.log(newArr2);
    // -- 실행 결과 --
    // 10 0 
    // 20 1
    // 30 2
    // [5, 6, 7]
    ```
    
    - 단어들은 사용자가 명명한 것 뿐이다
    - 컴퓨터는 오로지 순서에 의해서만 각각을 구분하고 인식한다.
    - map 메서드에 정의된 규칙에는 콜백 함수의 인자로 넘어올 값들 및 그 순서도 포함되어 있다. 콜백 함수를 호출하는 주체가 사용자가 아닌 map 메서드이므로 map 메서드가 콜백 함수를 호출할 때 인자에 어떤 값들을 어떤 순서로 넘길 것인지는 전적으로 map 메서드에 달렸다.

⇒ 콜백 함수의 제어권을 넘겨받은 코드는 콜백 함수를 호출할 때 인자에 어떤 값들을 어떤 순서로 넘길 것인지에 대한 제어권을 가진다. 

### **4-2-3 this**

- 콜백 함수의 this가 무엇을 바라보도록 할지가 정해져 있는 경우도 있다. 정하지 않은 경우에는 전역객체를 바라본다. 사용자 임의로 this를 바꾸고 싶을 경우 bind 메서드를 활용하면 된다.
- Array.prototype.map 구현
    
    ```jsx
    Array.prototype.map = function(callback, thisArg) {
    	var mappedArr = [];
    	for(var i = 0; o < this.length; i++) {
    		var mappedValue = callback.call(thisArg || window, this[i], i, this);
    		mappedArr[i] = mappedValue;
    	}
    	return mappedArr;
    };
    ```
    
    - this에 thisArg 값이 있을 경우에는 그 값을, 없을 경우에는 전역 객체를 지정한다.
    - 첫번째 인자 = i번째 요소값
    - 두번째 인자 = i 값
    - 세번째 인자 = 배열 자체
    - 바로 제어권을 넘겨받을 코드에서 call/apply 메서드의 첫번째 인자에 콜백 함수 내부에서의 this가 될 대상을 명시적으로 바인딩한다.
- 콜백 함수 내부에서의 this
    
    ```jsx
    setTimeout(function () { console.log(this); }, 300); // Window
    
    [1, 2, 3, 4, 5].forEach(function (x) {
    	console.log(this);                                 // Window
    });
    
    document.body.innerHTML += "<button id='a'>클릭</button>";
    document.body.querySelector("#a")
    	.addEventListener("click", function (e) {
    		console.log(this);                         // "<button id='a'>클릭</button>"
    	}
    );
    ```
    
    - setTimeout = 내부에서 콜백 함수를 호출할 때 call 메서드의 첫 번째 인자에 전역객체를 넘기기 때문에 콜백 함수 내부에서의 this가 전역 객체를 가리킨다.
    - forEach = 별도의 인자로 this를 받는 경우가 아니기 때문에 전역 객체를 가리킨다
    - addEventListener = 내부에서 콜백 함수를 호출할 때 call 메서드의 첫 번째 인자에 addEventListener 메서드의 this를 그대로 넘기도록 정의되어 있기 때문에 HTML 엘리먼트를 가리킨다.

 **03 콜백 함수는 함수다**

- 어떤 함수에 인자로 메서드를 전달하더라도 이는 결국 함수로서 실행된다.
- 메서드를 콜백 함수로 전달한 경우
    
    ```jsx
     var obj = {
    	vals: [1, 2, 3],
    	logValues: function(v, i) {
    			console.log(this, v, i);
    	}
    };
    obj.logValues(1, 2);
    [4, 5, 6].forEach(obj.logValues);
    ```
    
    - `obj.logValues(1, 2);` = 메서드로써 호출
    - `[4, 5, 6].forEach(obj.logValues);` = 메서드를 forEach 함수의 콜백 함수로서 전달
        - obj를 this로 하는 메서드를 그대로 전달한 것이 아니라, obj.logValues가 가리키는 함수만 전달한 것이다.
        - obj와 직접적인 연관이 없다.
        - forEach에 의해 콜백이 함수로서 호출되고, 별도로 this를 지정하는 인자를 지정하지 않았으므로 함수 내부에서의 this를 전역객체를 바라보게 된다.

 **04 콜백 함수 내부의 this에 다른 값 바인딩하기**

- 전통적인 방식: this를 다른 변수에 담아 콜백 함수로 활용할 함수에서는 this 대신 그 변수를 사용하게 하고, 이를 클로저로 만드는 방식
    
    ```jsx
    var obj1 = {
    	name: "obj1",
    	func: function() {
    		var self = this;
    		return function () {
    			console.log(self.name);
    		}
    	}
    };
    var callback = obj1.func();
    setTimeout(callback, 1000);
    ```
    
- func 함수 재활용
    
    ```jsx
    var obj2 = {
    	name: "obj2",
    	func: obj1.func
    };
    var callback2 = obj2.func();
    setTimeout(callback2, 1500);
    
    var obj3 = { name: "obj3" };
    var callback3 = obj1.func.call(obj3);
    setTimeout(callback3, 2000);
    ```
    
    - 콜백 함수 내부에서 this를 사용하지 않으면 처음부터 바라볼 객체를 명시적으로 obj1로 지정했기 때문에 어떤 방법으로도 다른 객체를 바라보게끔 할 수 없다.
- bind 메서드 활용
    
    ```jsx
    var obj1 = {
    	name: "obj1",
    	func: function() {
    		console.log(self.name);
    	}
    };
    setTimeout(obj1.func.bind(obj1), 1000);
    
    var obj2 = { name: "obj2" };
    setTimeout(obj1.func.bind(obj2), 1500);
    ```
    

 **05 콜백 지옥과 비동기 제어**

- 콜백 지옥: 콜백 함수를 익명 함수로 전달하는 과정이 반복되어 코드의 들여쓰기 수준이 감당하기 힘들 정도로 깊어지는 현상
    - 주로 이벤트 처리나 서버 통신과 같이 비동기적인 작업을 수행하기 위해 이런 형태가 등장한다.
    - 가독성이 덜어지고 코드를 수정하기도 어렵다.
- 동기 vs. 비동기
    - 동기: 현재 실행 중인 코드가 완료된 후에야 다음 코드를 실행하는 방식
        - CPU의 계산에 의해 즉시 처리가 가능한 대부분의 코드는 동기적인 코드
    - 비동기: 현재 실행 중인 코드의 완료 여부와 무관하게 즉시 다음 코드로 넘어갑니다.
        - 사용자의 요청에 의해 특정 시간이 경과되기 전까지 어떤 함수의 실행을 보류 (setTimeout)
        - 한다거나 사용자의 직접적인 개입이 있을 때 비로소 어떤 함수를 실행하도록 대기 (addEventListner)
        - 웹브라우저 자체가 아닌 별도의 대상에 무언가를 요청하고 그에 대한 응답이 왔을 때 비로소 어떤 함수를 실행하도록 대기 (XMLHttpRequest)
        - 별도의 요청, 실행 대기, 보류 등등