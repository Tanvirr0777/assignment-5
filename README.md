Question-1
What is the difference between var, let, and const?
Solution : 
           var:
               Function scoped
               Can be re-declared
               Can be re-assigned
               get hoisted (initialized)

           let:
               Block scoped
               Can be re-declared
               Can be re-assigned
               hoisted but not initialized

          const: 
                Block scoped 
                Can not be re-declared
                Can not be re-assigned 
                Must be initialed when declared


Question-2
What is the spread operator (...)?
Solution:
         Used to expand or unpack element from array,object.

         example - const numbers = [1,2,3]
                   console.log(...numbers);

                   print (1,2,3) as separate number not array element


Question-3
What is the difference between map(), filter(), and forEach()?
Solution:
         map():
               Modify array but size remains unchanged
               Modify by creating new array

               example : let arr = [1,2,3];
                         arr.map(number => num * 2)

                         its return [2,4,6]

        filter():
                 Modify array with size decrasing
                 Modify by creating new array with elements those pass selected condition

                 example : let arr = [1,2,3]
                           arr.filter(num => num > 1)

                           its return [2,3]


Question-4
What is an arrow function?
Solution:
         Shorter way to write a function

         example:
               const addTwoNumber = (a,b) => a+b ;

               the function reurn a+b;


Questuin-5
What are template literals?
Solution:
          Allow to create string within ` ` instead of "" and '', that support
          Multiline string
          dynamic value

          example:
               const id = `PH-${student.mobileNumber}`;
                ${} used to add dynamic value.


                               



                  