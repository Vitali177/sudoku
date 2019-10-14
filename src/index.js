module.exports = function solveSudoku(matrix) {
  
  // i - строка
  // j - столбец

  /*var matrix = [
    [0, 0, 0, 9, 3, 8, 0, 4, 0],
    [0, 0, 0, 7, 6, 0, 0, 0, 2],
    [7, 4, 0, 5, 0, 0, 0, 8, 0],
    [8, 0, 0, 6, 7, 5, 0, 1, 3],
    [0, 7, 0, 3, 0, 2, 8, 0, 0],
    [3, 2, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 6, 3, 2, 0],
    [0, 5, 0, 4, 0, 0, 0, 0, 0],
    [1, 0, 6, 2, 0, 0, 0, 5, 0]
  ]; */

  var AllZeros = [];

  var zero = {};
  var canBe = []; // массив возможных значений для данной клетки
  var numbersInRow = [];  // массив значений в данной строке, кроме нулей
  var numbersInCol = [];  // массив значений в данном столбце, кроме нулей





  function checkPossibleNumbers(matrix) {

    var row = 0;

    var kolCanBeAllNumbers = {      
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      row: row
    };

    for (var key in AllZeros) {

      if (AllZeros[key].row !== row) {
        row++;

        while (AllZeros[key].row !== row) 
          row++;
        
        // поработать с объектом

        // функция

        replacedZero(matrix, kolCanBeAllNumbers);

        //console.log('строка -  ' + (row - 1) );
        //console.log( kolCanBeAllNumbers);

        kolCanBeAllNumbers = {
          '1': 0,
          '2': 0,
          '3': 0,
          '4': 0,
          '5': 0,
          '6': 0,
          '7': 0,
          '8': 0,
          '9': 0,
          row: row
        };
      } 

      for (var key2 in AllZeros[key].canBe) {

        // если в массиве canBe одно возмжное значение, то оно и будет для нашей ячейки

        if (AllZeros[key].canBe.length === 1) {

          matrix[AllZeros[key].row][AllZeros[key].col]  = AllZeros[key].canBe[0];

          //console.log('одно возможное значение - ' +  AllZeros[key].canBe[0] )          
        }


        number = AllZeros[key].canBe[key2];
        number = number + '';
        //console.log(number);
        kolCanBeAllNumbers[number] +=  1;
      }
    }

    // не забыть поработать с 9-ой строкой
    kolCanBeAllNumbers.row = 8;
    replacedZero(matrix, kolCanBeAllNumbers);

    //console.log('строка -  ' + '8');
    //console.log( kolCanBeAllNumbers);    
   
  }


  function doubleTripleCanBe (matrix, AllZeros, f) {

    if (f < 0) return;

    // будем искать тройку нулей с одинаковыми массивами из трех чисел

    for (var key in AllZeros) {
      for (var key2 in AllZeros) {
        for (var key3 in AllZeros) {        

          // если они одни и те же          
          if ( (key3 === key2) || (key3 === key) || (key2 === key) ) continue;

          // проверка на кол-во значений в них
          if (AllZeros[key3].canBe.length !== 3 || AllZeros[key2].canBe.length !== 3 || AllZeros[key].canBe.length !== 3) continue;

          // так как в массиве canBe значения располагаются по порядку, то проверить их будет намного проще
          // проверяем на каждое из трех значений

          

          if (AllZeros[key3].canBe[2] !== AllZeros[key2].canBe[2] || AllZeros[key3].canBe[2] !== AllZeros[key].canBe[2]) continue;
          if (AllZeros[key3].canBe[1] !== AllZeros[key2].canBe[1] || AllZeros[key3].canBe[1] !== AllZeros[key].canBe[1]) continue;
          if (AllZeros[key3].canBe[0] !== AllZeros[key2].canBe[0] || AllZeros[key3].canBe[0] !== AllZeros[key].canBe[0]) continue;

         // console.log('прошли проверку массивы - ' + AllZeros[key3].canBe);

          // проверяем, что это не просто рандомные, а расположенные либо в одной строке либо в одном столбце либо в одном квадрате
          // чтобы потом можно было убрать эти же варианты для других нулей расположенных в этом же месте, что и трое этих массивах

          if ( AllZeros[key].row === AllZeros[key2].row && AllZeros[key].row === AllZeros[key3].row ) {

            //console.log('в одной строке');

            for (var key4 in AllZeros) {
              // ищем другие нули в этой строке, если они есть
              if (key4 === key3 || key4 === key2 || key4 === key) continue;

              if (AllZeros[key4].row !== AllZeros[key3].row) continue;

              // если нашли такой ноль, но убираем из его вариантов числа, в наших массивах

              for (var keyMass in AllZeros[key4].canBe) {

                // если такой вариант есть в нуле, то убираем его

                if ( (AllZeros[key4].canBe[keyMass] === AllZeros[key3].canBe[0]) ||
                     (AllZeros[key4].canBe[keyMass] === AllZeros[key3].canBe[1]) ||
                     (AllZeros[key4].canBe[keyMass] === AllZeros[key3].canBe[2])  ) {

                  //console.log('до удаления - ' + AllZeros[key4].canBe);
                  
                  AllZeros[key4].canBe.splice(keyMass, 1);

                  //console.log('после удаления - ' + AllZeros[key4].canBe);

                  if (AllZeros[key4].canBe.length === 1) {

                    matrix[AllZeros[key4].row][AllZeros[key4].col] = AllZeros[key4].canBe[0];
  
                    //console.log('установили в эту ячейку цифру -  ' + AllZeros[key4].canBe[0]);
                  }
                }                  
              }
            }
          }

          if ( AllZeros[key].col === AllZeros[key2].col && AllZeros[key].col === AllZeros[key3].col ) {
            //console.log('в одном столбце');

            for (let key4 in AllZeros) {
              // ищем другие нули в этой строке, если они есть
              if (key4 === key3 || key4 === key2 || key4 === key) continue;

              if (AllZeros[key4].col !== AllZeros[key3].col) continue;

              // если нашли такой ноль, но убираем из его вариантов числа, в наших массивах

              for (let keyMass in AllZeros[key4].canBe) {

                // если такой вариант есть в нуле, то убираем его

                if ( (AllZeros[key4].canBe[keyMass] === AllZeros[key3].canBe[0]) ||
                     (AllZeros[key4].canBe[keyMass] === AllZeros[key3].canBe[1]) ||
                     (AllZeros[key4].canBe[keyMass] === AllZeros[key3].canBe[2])  ) {

                  //console.log('до удаления - ' + AllZeros[key4].canBe);
                  
                  AllZeros[key4].canBe.splice(keyMass, 1);

                  //console.log('после удаления - ' + AllZeros[key4].canBe);

                  if (AllZeros[key4].canBe.length === 1) {

                    matrix[AllZeros[key4].row][AllZeros[key4].col] = AllZeros[key4].canBe[0];
  
                    //console.log('установили в эту ячейку цифру -  ' + AllZeros[key4].canBe[0]);
                  }
                }                  
              }
            }            
            
          }

          // в одном квадрате
          // узнаем в каком квадрате находится, к примеру массив с третьем ключом

          var maxIndexRow, minIndexRow, maxIndexCol, minIndexCol;

          if (AllZeros[key3].row < 3) {
            maxIndexRow = 2;
            minIndexRow = 0;
          } else if (AllZeros[key3].row < 6) {
            maxIndexRow = 5;
            minIndexRow = 3;
          } else {
            maxIndexRow = 8;
            minIndexRow = 6;
          }

          if (AllZeros[key3].col < 3) {
            maxIndexCol = 2;
            minIndexCol = 0;
          } else if (AllZeros[key3].col < 6) {
            maxIndexCol = 5;
            minIndexCol = 3;
          } else {
            maxIndexCol = 8;
            minIndexCol = 6;
          }
          // проверяем располагаются ли два других нуля в этом же квадрате

          if (AllZeros[key2].row < minIndexRow || AllZeros[key2].row > maxIndexRow) continue;
          if (AllZeros[key2].col < minIndexCol || AllZeros[key2].col > maxIndexCol) continue;

          if (AllZeros[key].row < minIndexRow || AllZeros[key].row > maxIndexRow) continue;
          if (AllZeros[key].col < minIndexCol || AllZeros[key].col > maxIndexCol) continue;

          //console.log ('этот массив в одном квадрате');

          for (let key4 in AllZeros) {

            if (key4 === key3 || key4 === key2 || key4 === key) continue;

            // отобрать нули которые расположены в нашем квадрате

            if (  AllZeros[key4].row < minIndexRow || AllZeros[key4].row > maxIndexRow ||
                  AllZeros[key4].col < minIndexCol || AllZeros[key4].col > maxIndexCol )   continue;

            for (let keyMass in AllZeros[key4].canBe) {

              // если такой вариант есть в нуле, то убираем его

              if ( (AllZeros[key4].canBe[keyMass] === AllZeros[key3].canBe[0]) ||
                   (AllZeros[key4].canBe[keyMass] === AllZeros[key3].canBe[1]) ||
                   (AllZeros[key4].canBe[keyMass] === AllZeros[key3].canBe[2])  ) {

                //console.log('до удаления - ' + AllZeros[key4].canBe);
                
                AllZeros[key4].canBe.splice(keyMass, 1);

                //console.log('после удаления - ' + AllZeros[key4].canBe);

                if (AllZeros[key4].canBe.length === 1) {

                  matrix[AllZeros[key4].row][AllZeros[key4].col] = AllZeros[key4].canBe[0];

                  //console.log('установили в эту ячейку цифру -  ' + AllZeros[key4].canBe[0]);
                }
              }                  
            }
          }
        }
      }
    }
    // будем искать двойку 

    var manyPairs = false; // если пар одинаковых массивах больше двух, то скипаем их

    for (let key in AllZeros) {

      manyPairs = false;
      for (let key2 in AllZeros) {

        // если они одни и те же          
        if ( key2 === key ) continue;
        // проверка на кол-во значений в них
        if (AllZeros[key2].canBe.length !== 2 || AllZeros[key].canBe.length !== 2) continue;


        // так как в массиве canBe значения располагаются по порядку, то проверить их будет намного проще       

        if (AllZeros[key2].canBe[1] !== AllZeros[key].canBe[1] || AllZeros[key2].canBe[0] !== AllZeros[key].canBe[0]) continue;        

        for (let key3 in AllZeros) {

          if ( (key3 === key2) || (key3 === key) ) continue;
          if (AllZeros[key3].canBe.length !== 2) continue;
          if (AllZeros[key3].canBe[0] === AllZeros[key2].canBe[0] && AllZeros[key3].canBe[1] === AllZeros[key2].canBe[1]) {
            manyPairs = true;
          }
        }
        // проверка на множество пар этих массивов
        if (manyPairs) { /*console.log('много пар этих массивов - ' + AllZeros[key2].canBe);*/ break;}

        //console.log('прошли проверку массивы - ' + AllZeros[key2].canBe);



        // проверяем, что это не просто рандомные, а расположенные либо в одной строке либо в одном столбце либо в одном квадрате
          // чтобы потом можно было убрать эти же варианты для других нулей расположенных в этом же месте, что и трое этих массивах

        if ( AllZeros[key].row === AllZeros[key2].row ) {

          //console.log('в одной строке');

          for (let key3 in AllZeros) {
            // ищем другие нули в этой строке, если они есть
            if (key3 === key2 || key3 === key) continue;

            if (AllZeros[key3].row !== AllZeros[key2].row) continue;

            // если нашли такой ноль, но убираем из его вариантов числа, в наших массивах

            for (let keyMass in AllZeros[key3].canBe) {

              // если такой вариант есть в нуле, то убираем его

              if ( (AllZeros[key3].canBe[keyMass] === AllZeros[key2].canBe[0]) ||
                    (AllZeros[key3].canBe[keyMass] === AllZeros[key2].canBe[1])  ) {

               // console.log('до удаления - ' + AllZeros[key3].canBe);
                
                AllZeros[key3].canBe.splice(keyMass, 1);

                //console.log('после удаления - ' + AllZeros[key3].canBe);

                if (AllZeros[key3].canBe.length === 1) {

                  matrix[AllZeros[key3].row][AllZeros[key3].col] = AllZeros[key3].canBe[0];
 
                  //console.log('установили в эту ячейку цифру -  ' + AllZeros[key3].canBe[0]);
                }
              }                  
            }
          }
        }

        if ( AllZeros[key].col === AllZeros[key2].col ) {
          //console.log('в одном столбце');

          for (let key3 in AllZeros) {
            // ищем другие нули в этой строке, если они есть
            if (key3 === key2 || key3 === key) continue;

            if (AllZeros[key3].col !== AllZeros[key2].col) continue;

            // если нашли такой ноль, но убираем из его вариантов числа, в наших массивах

            for (let keyMass in AllZeros[key3].canBe) {

              // если такой вариант есть в нуле, то убираем его

              if ( (AllZeros[key3].canBe[keyMass] === AllZeros[key2].canBe[0]) ||
                    (AllZeros[key3].canBe[keyMass] === AllZeros[key2].canBe[1])  ) {

                //console.log('до удаления - ' + AllZeros[key3].canBe);
                
                AllZeros[key3].canBe.splice(keyMass, 1);

                //console.log('после удаления - ' + AllZeros[key3].canBe);

                if (AllZeros[key3].canBe.length === 1) {

                  matrix[AllZeros[key3].row][AllZeros[key3].col] = AllZeros[key3].canBe[0];

                  //console.log('установили в эту ячейку цифру -  ' + AllZeros[key3].canBe[0]);
                }

              }                  
            }
          }
          
        }

        // в одном квадрате
        // узнаем в каком квадрате находится, к примеру массив со вторым ключом

        let maxIndexRow, minIndexRow, maxIndexCol, minIndexCol;

        if (AllZeros[key2].row < 3) {
          maxIndexRow = 2;
          minIndexRow = 0;
        } else if (AllZeros[key2].row < 6) {
          maxIndexRow = 5;
          minIndexRow = 3;
        } else {
          maxIndexRow = 8;
          minIndexRow = 6;
        }

        if (AllZeros[key2].col < 3) {
          maxIndexCol = 2;
          minIndexCol = 0;
        } else if (AllZeros[key2].col < 6) {
          maxIndexCol = 5;
          minIndexCol = 3;
        } else {
          maxIndexCol = 8;
          minIndexCol = 6;
        } 

         // проверяем располагаются лидругой нуля в этом же квадрате

         if (AllZeros[key].row < minIndexRow || AllZeros[key].row > maxIndexRow) continue;
         if (AllZeros[key].col < minIndexCol || AllZeros[key].col > maxIndexCol) continue;

         //console.log ('этот массив в одном квадрате');

         for (let key3 in AllZeros) {

           if (key3 === key2 || key3 === key) continue;

           // отобрать нули которые расположены в нашем квадрате

           if (  AllZeros[key3].row < minIndexRow || AllZeros[key3].row > maxIndexRow ||
                 AllZeros[key3].col < minIndexCol || AllZeros[key3].col > maxIndexCol )   continue;

           for (let keyMass in AllZeros[key3].canBe) {

             // если такой вариант есть в нуле, то убираем его

             if ( (AllZeros[key3].canBe[keyMass] === AllZeros[key2].canBe[0]) ||
                  (AllZeros[key3].canBe[keyMass] === AllZeros[key2].canBe[1]) ) {

               //console.log('до удаления - ' + AllZeros[key4].canBe);
               
               AllZeros[key3].canBe.splice(keyMass, 1);

               //console.log('после удаления - ' + AllZeros[key4].canBe);

               if (AllZeros[key3].canBe.length === 1) {

                 matrix[AllZeros[key3].row][AllZeros[key3].col] = AllZeros[key3].canBe[0];

                 //console.log('установили в эту ячейку цифру -  ' + AllZeros[key4].canBe[0]);
               }
             }                  
           }
         }


      }
    }

  }



  

  function replacedZero(matrix, kolCanBeAllNumbers) {

    var numberForReplace = null;

    // найдем цифру, на которую потом заменим наш ноль

    for (var key in kolCanBeAllNumbers) {

      //console.log(kolCanBeAllNumbers[key]);


      if ( kolCanBeAllNumbers[key] === 1 && key != 'row')
        numberForReplace = key;
      
    }

    if (numberForReplace === null ) return;

    numberForReplace *= 1;

    //console.log('numberForReplace -  ' + numberForReplace);

    // теперь найдем ноль, который нужно будет заменить этим числом, зная строку в которой он находится, и значение, которым он может являться 

    var rowThisZero = kolCanBeAllNumbers.row;

    rowThisZero *= 1;

    //console.log('rowThisZero  - ' + rowThisZero);

    for (var key2 in AllZeros) {

      if (AllZeros[key2].row === rowThisZero) {

        var arr = AllZeros[key2].canBe;

        if (arr.indexOf(numberForReplace) !== -1 ) {

          //console.log('ячейка для замены - ' + AllZeros[key2]);

          matrix[AllZeros[key2].row][AllZeros[key2].col] = numberForReplace;

          // надо удалить этот ноль с массива всех нулей
          return;
        }
      }
    }


  }





  function randomFromTwo (matrix, AllZeros) {


    var manyPairs = false; // если пар одинаковых массивах больше двух, то скипаем их

    for (let key in AllZeros) {

      manyPairs = false;
      for (let key2 in AllZeros) {

        if ( key2 === key ) continue;

        if (AllZeros[key2].canBe.length !== 2 || AllZeros[key].canBe.length !== 2) continue;


        if (AllZeros[key2].canBe[1] !== AllZeros[key].canBe[1] || AllZeros[key2].canBe[0] !== AllZeros[key].canBe[0]) continue;        

        for (let key3 in AllZeros) {

          if ( (key3 === key2) || (key3 === key) ) continue;
          if (AllZeros[key3].canBe.length !== 2) continue;
          if (AllZeros[key3].canBe[0] === AllZeros[key2].canBe[0] && AllZeros[key3].canBe[1] === AllZeros[key2].canBe[1]) {
            manyPairs = true;
          }
        }

        if (manyPairs) break;

        //console.log('рандомом присваиваем первому массиву - ' + AllZeros[key].canBe);

        //console.log(' рандомно достаем число - ' + AllZeros[key].canBe[0]);

        matrix[AllZeros[key].row][AllZeros[key].col] = AllZeros[key].canBe[0];

        return;
      }
    }
  }



  for (var f = 0; f < 50; f++) {

    if ( f % 20 === 0) randomFromTwo(matrix, AllZeros);

    AllZeros = [];

    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) { 
        
        numbersInRow = [];
        numbersInCol = [];
        canBe = [];
    
        if (matrix[i][j] === 0) {        

          for (var row = 0; row < 9; row++) {
            
            if (row === i || matrix[row][j] === 0) continue;

            numbersInCol.push(matrix[row][j]);          
          }

          for (var col = 0; col < 9; col++) {
            
            if (col === j || matrix[i][col] === 0) continue;

            numbersInRow.push(matrix[i][col]);          
          }

          //console.log(numbersInRow);
          //console.log(numbersInCol);


          // найдем значения(значение), которые возможны в этой клетке


          for (var number = 1; number <= 9; number++) {

            // если этого числа нет в строке и столбце, то оно может подходить к данной клетке

            if (numbersInRow.indexOf(number) === -1 && numbersInCol.indexOf(number) === -1) {

              // проверка на квадрат 3 на 3

              if (i < 3) {
                if (j < 3) {
                  if ((i !== 0 && j !== 0 && number === matrix[0][0])  || (i !== 1 && j !== 0  && number === matrix[1][0])  || (i !== 2 && j !== 0 && number === matrix[2][0]) ||
                      (i !== 0 && j !== 1  && number === matrix[0][1]) || (i !== 1 && j !== 1  && number === matrix[1][1])  || (i !== 2 && j !== 1 && number === matrix[2][1]) ||
                      (i !== 0 && j !== 2  && number === matrix[0][2]) || (i !== 1 && j !== 2  && number === matrix[1][2])  || (i !== 2 && j !== 2 && number === matrix[2][2]) ) 
                      {
                      //console.log ('есть в первом тругольнике -  ' + number);
                      continue;
                    }        
                } else if (j < 6) {
                  if ((i !== 0 && j !== 3 && number === matrix[0][3])  || (i !== 1 && j !== 3  && number === matrix[1][3])  || (i !== 2 && j !== 3 && number === matrix[2][3]) ||
                      (i !== 0 && j !== 4  && number === matrix[0][4]) || (i !== 1 && j !== 4  && number === matrix[1][4])  || (i !== 2 && j !== 4 && number === matrix[2][4]) ||
                      (i !== 0 && j !== 5  && number === matrix[0][5]) || (i !== 1 && j !== 5  && number === matrix[1][5])  || (i !== 2 && j !== 5 && number === matrix[2][5]) )  {
                    //console.log ('есть в четвертом тругольнике -  ' + number);
                    continue;
                  }
                } else {
                  if ((i !== 0 && j !== 6 && number === matrix[0][6])  || (i !== 1 && j !== 6  && number === matrix[1][6])  || (i !== 2 && j !== 6 && number === matrix[2][6]) ||
                      (i !== 0 && j !== 7  && number === matrix[0][7]) || (i !== 1 && j !== 7  && number === matrix[1][7])  || (i !== 2 && j !== 7 && number === matrix[2][7]) ||
                      (i !== 0 && j !== 8  && number === matrix[0][8]) || (i !== 1 && j !== 8  && number === matrix[1][8])  || (i !== 2 && j !== 8 && number === matrix[2][8]) ) 
                  {
                    //console.log ('есть в седьмом тругольнике -  ' + number);
                    continue;
                  }
                }
              } else if (i < 6) {
                  if (j < 3) {
                    if ((i !== 3 && j !== 0 && number === matrix[3][0])  || (i !== 4 && j !== 0  && number === matrix[4][0])  || (i !== 5 && j !== 0 && number === matrix[5][0]) ||
                        (i !== 3 && j !== 1  && number === matrix[3][1]) || (i !== 4 && j !== 1  && number === matrix[4][1])  || (i !== 5 && j !== 1 && number === matrix[5][1]) ||
                        (i !== 3 && j !== 2  && number === matrix[3][2]) || (i !== 4 && j !== 2  && number === matrix[4][2])  || (i !== 5 && j !== 2 && number === matrix[5][2]) ) 
                          {
                            //console.log ('есть во втором тругольнике -  ' + number);
                            continue;
                          }
                  }else if (j < 6) {
                    if ((i !== 3 && j !== 3 && number === matrix[3][3])  || (i !== 4 && j !== 3  && number === matrix[4][3])  || (i !== 5 && j !== 3 && number === matrix[5][3]) ||
                        (i !== 3 && j !== 4  && number === matrix[3][4]) || (i !== 4 && j !== 4  && number === matrix[4][4])  || (i !== 5 && j !== 4 && number === matrix[5][4]) ||
                        (i !== 3 && j !== 5  && number === matrix[3][5]) || (i !== 4 && j !== 5  && number === matrix[4][5])  || (i !== 5 && j !== 5 && number === matrix[5][5]) ) 
                          {
                            //console.log ('есть в пятом тругольнике -  ' + number);
                            continue;
                          }
                  } else {
                    if ((i !== 3 && j !== 6 && number === matrix[3][6])  || (i !== 4 && j !== 6  && number === matrix[4][6])  || (i !== 5 && j !== 6 && number === matrix[5][6]) ||
                        (i !== 3 && j !== 7  && number === matrix[3][7]) || (i !== 4 && j !== 7  && number === matrix[4][7])  || (i !== 5 && j !== 7 && number === matrix[5][7]) ||
                        (i !== 3 && j !== 8  && number === matrix[3][8]) || (i !== 4 && j !== 8  && number === matrix[4][8])  || (i !== 5 && j !== 8 && number === matrix[5][8]) ) 
                          {
                            //console.log ('есть в седьмом тругольнике -  ' + number);
                            continue;
                          }
                  }
              } else {
                if (j < 3) {
                  if ((i !== 6 && j !== 0 && number === matrix[6][0])  || (i !== 7 && j !== 0  && number === matrix[7][0])  || (i !== 8 && j !== 0 && number === matrix[8][0]) ||
                      (i !== 6 && j !== 1  && number === matrix[6][1]) || (i !== 7 && j !== 1  && number === matrix[7][1])  || (i !== 8 && j !== 1 && number === matrix[8][1]) ||
                      (i !== 6 && j !== 2  && number === matrix[6][2]) || (i !== 7 && j !== 2  && number === matrix[7][2])  || (i !== 8 && j !== 2 && number === matrix[8][2]) ) 
                        {
                         // console.log ('есть в третьем тругольнике -  ' + number);
                          continue;
                        }
                } else if (j < 6) {
                  if ((i !== 6 && j !== 3 && number === matrix[6][3])  || (i !== 7 && j !== 3  && number === matrix[7][3])  || (i !== 8 && j !== 3 && number === matrix[8][3]) ||
                      (i !== 6 && j !== 4  && number === matrix[6][4]) || (i !== 7 && j !== 4  && number === matrix[7][4])  || (i !== 8 && j !== 4 && number === matrix[8][4]) ||
                      (i !== 6 && j !== 5  && number === matrix[6][5]) || (i !== 7 && j !== 5  && number === matrix[7][5])  || (i !== 8 && j !== 5 && number === matrix[8][5]) ) 
                        {
                          //console.log ('есть в шестом тругольнике -  ' + number);
                          continue;
                        }
                } else {
                  if ((i !== 6 && j !== 6 && number === matrix[6][6])  || (i !== 7 && j !== 6  && number === matrix[7][6])  || (i !== 8 && j !== 6 && number === matrix[8][6]) ||
                      (i !== 6 && j !== 7  && number === matrix[6][7]) || (i !== 7 && j !== 7  && number === matrix[7][7])  || (i !== 8 && j !== 7 && number === matrix[8][7]) ||
                      (i !== 6 && j !== 8  && number === matrix[6][8]) || (i !== 7 && j !== 8  && number === matrix[7][8])  || (i !== 8 && j !== 8 && number === matrix[8][8]) ) 
                        {
                          //console.log ('есть в девятом тругольнике -  ' + number);
                          continue;
                        }
                }
              }

              canBe.push(number);
            }
          }  

          zero = {         
            row: i,
            col: j,
            canBe: canBe
          };

          AllZeros.push(zero);

        }      
      }
    }

    //console.log(AllZeros);
  
    checkPossibleNumbers(matrix);

    doubleTripleCanBe(matrix, AllZeros, f);

    //console.log(matrix);

  } 
  
  //console.log(AllZeros);
 // console.log(matrix);
  

  return matrix;
}
