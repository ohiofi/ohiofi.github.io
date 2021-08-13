---
  layout: post
  title: Python Classes to Javascript Classes
  date: 2021-08-13
  categories:
  - programming
  tags:
  - education
  - classes
  - object-oriented programming
  - Javascript
  - Python

---


This summer I was working on translating a project with a dozen Python classes into Javascript ES6 classes. The following are "notes to myself" about the substitutions that can be made automatically in order to speed up the translation process.



| replace all (this --> with that) |
| ------------ |
| `def __init__ --> constructor` |
| `def --> ` |
| `(self): --> (){` |
| `(self, --> (` |
| `): --> ){` |
| `self. --> this.` |
| `# --> //#` |
| `else: --> }else{` |
| `print( --> console.log(` |
| `int( --> Math.floor(` |
| `str( --> (""+` |
| `True --> true` |
| `False --> false` |
| `None --> null` |
| `and not --> && !` |
| `if not --> if (!` |
| `while true: --> while (true){` |



The following substitutions need to be made manually (one at a time).



| find and replace manually |
| ------------- |
| `and --> &&` |
| `result = --> let result = ` |
| `temp = --> let temp = ` |
| `.append --> .push` |
| `len(foo)` |
| `for i in range(` |
| `for each in --> for (let each of` |
| `while` |
| `@staticmethod \n def --> static` |
| `@classmethod \n def --> static` |
| `.sort(key=lambda x: x.getGrade(), reverse=False) --> .sort(function(a, b){return a.getGrade() - b.getGrade()})` |
| `.sort(key=lambda x: x.getGrade(), reverse=True) --> .sort(function(a, b){return b.getGrade() - a.getGrade()})` |
