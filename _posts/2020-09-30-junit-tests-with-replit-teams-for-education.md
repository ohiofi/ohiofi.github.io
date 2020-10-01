---
  layout: post
  title: JUnit Tests with Repl.it Teams for Education
  date: 2020-09-30
  categories:
  - teaching
  tags:
  - programming
  - education
  - repl.it
  - Java
  - test
  - teaching
  - LMS

---

Notes to myself about how to setup a Java repl to work with automatic JUnit tests.

First, add junit:junit from Packages

Next, redirect the "Run" button:

1.  Create a new .replit file and add `run = "bash run.sh"`

1.  Create a new shell script run.sh and add the following lines...
```
javac -classpath .:/run_dir/junit-4.12.jar:/run_dir/hamcrest-core-1.3.jar:/run_dir/json-simple-1.1.1.jar -d . *.java 
java -classpath .:/run_dir/junit-4.12.jar:/run_dir/hamcrest-core-1.3.jar:/run_dir/json-simple-1.1.1.jar ShoesTester
# javac *.java
# java ShoesTester
```

Here is a sample ShoesTester file:
```
import org.junit.*;
import org.junit.runner.*;
import static org.junit.Assert.*;

public class ShoesTester {
  public int add3(int n) {
    return n+3;
  }
  
  @Test
  public void test_add3() {
    assertEquals(8,add3(5)); 
  }

  @Test 
  public void trivial_test(){
    assertTrue(5 == 2+3);
    assertFalse(7 != 14/2);
  }

  public static void main(String[] args) {
    System.out.println("Hello tests!");
    org.junit.runner.JUnitCore.main("ShoesTester");
  }
}
```
