const prompt = require('prompt-sync')({sigint: true});

const atomicSymbols = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og']

  
function basicSpeller()
{
  function elementSpeller(userWord)
  {
    var result = []; 
    var start = 0; 
    var pausePoint = []; 
    
    const symFinder = (word, start, pause) => { 
      for(let i = pause; i < atomicSymbols.length; i++)
      {
        var sym = atomicSymbols[i];
        var wordSubstring = word.substring(start, start + 2);

        if(wordSubstring.indexOf(sym.toUpperCase()) == 0)
        {
          pausePoint.push(i);
          return sym;
        }
      }
      return -1;
    }

    while(start != userWord.length) 
    {
      var sym = symFinder(userWord, start, 0);

      while(sym == -1)
      {
        if(result.length != 0) 
        {
          var popLen = result.pop().length; 
          start -= popLen;
          var lastIdx = pausePoint.pop();
          
          sym = symFinder(userWord, start, lastIdx + 1);
        }

        else
        {
          console.log("Impossible");
          break;
        }
      }

      if(sym != -1)
      {
        result.push(sym);
        start += sym.length;
      } 

      else 
      {
        break;
      }
    }

    if(start == userWord.length)
    {
      return result;
    }
  }
  userWord = prompt("Please enter a word: ");
  userWord = userWord.toUpperCase();
  console.log(elementSpeller(userWord));
}


function incompleteSpeller()
{
  function elementSpeller(userWord)
  {
    var result = []; 
    var start = 0; 
    var pausePoint = []; 
    var symFound = false;
    
    const symFinder = (word, start, pause) => { 
      for(let i = pause; i < atomicSymbols.length; i++)
      {
        var sym = atomicSymbols[i];
        var wordSubstring = word.substring(start, start + 2);

        

        if(wordSubstring.indexOf(sym.toUpperCase()) == 0)
        {
          pausePoint.push(i);
          return sym;
        }
      }
      return -1;
    }

    while(start != userWord.length) 
    {
      var sym = symFinder(userWord, start, 0);

      while(sym == -1)
      {
        if(result.length != 0) 
        {
          var popLen = result.pop().length; 
          start -= popLen;
          var lastIdx = pausePoint.pop();
          
          sym = symFinder(userWord, start, lastIdx + 1);
        }

        else
        {
          console.log("Impossible");
          break;
        }
      }

      if(sym != -1)
      {
        result.push(sym);
        start += sym.length;
      } 

      else 
      {
        break;
      }
    }

    if(start == userWord.length)
    {
      return result;
    }
  }
  userWord = prompt("Please enter a word: ");
  userWord = userWord.toUpperCase();
  console.log(elementSpeller(userWord));
}


function bestSpeller()
{
  function elementSpeller(userWord)
  {
    var result = []
    var combinedWord = '';
    var possiblity = [];
    
    const symPossibilities = (word, start) => { 
      var container = [];

      for(let i = 0; i < atomicSymbols.length; i++)
      {
        let sym = atomicSymbols[i];
        let wordSubstring = word.substring(start, start + 2);

        if(wordSubstring.indexOf(sym.toUpperCase()) == 0)
        {
          container.push(sym);
        }
      } 

      possiblity.push(container);
    }
    
    for(start = 0; start < userWord.length; start++){
      symPossibilities(userWord, start);
    }
    
    for(let x = 0; x < possiblity.length; x++)
    {
      possiblity[x] = possiblity[x].sort((a,b) => b.length - a.length);
    }
        
    console.log(possiblity);


    var i = 0;
    var j = 0;
    var holder = [];
    var tempLen = 0

    while(i < possiblity.length)
    { 
      if(possiblity[i].length != 0)
      {
        if(userWord.substring(tempLen, tempLen + possiblity[i][j].length) == possiblity[i][j].toUpperCase())
        {
          combinedWord += possiblity[i][j];
          holder.push(possiblity[i][j]);

          tempLen += possiblity[i][j].length;
        }
      }


      if(combinedWord.length > userWord.length)
      {
        combinedWord -= possiblity[i][j];
        holder.pop();

        if(possiblity[i].length > 1)
        {
          j++
        }
      }

      else
      {
        i++;
        j = 0;
      }

      if(combinedWord.length == userWord.length)
      {
        break;
      }
    }

    if(combinedWord.length != userWord.length)
    {
      console.log("Impossible");
    }

    else
    {
      console.log(combinedWord);
      console.log(holder);
    }
}



  userWord = prompt("Please enter a word: ");
  userWord = userWord.toUpperCase();
  elementSpeller(userWord);
}

basicSpeller();