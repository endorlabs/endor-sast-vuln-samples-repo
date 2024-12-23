// License: LGPL-3.0 License (c) find-sec-bugs
package strings;
import java.util.Formatter;
import java.util.Locale;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServlet;

public class FormatStringManipulation extends HttpServlet{

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException{

        // create a new formatter
        StringBuffer buffer = new StringBuffer();
        Formatter formatter = new Formatter(buffer, Locale.US);
        String input = request.getParameter("suffix");
        String format = "The customer: %s %s" + input;

        //test cases
        // ruleid: java_strings_rule-FormatStringManipulation
        formatter.format(format, "John", "Smith", "Jr"); //BAD
        // ruleid: java_strings_rule-FormatStringManipulation
        formatter.format(Locale.US, format, "John", "Smith"); //BAD
        //false positive test
        formatter.format("The customer: %s %s", "John", request.getParameter("testParam")); //OK
        
        // ruleid: java_strings_rule-FormatStringManipulation
        System.out.printf(format, "John", "Smith"); //BAD
        // ruleid: java_strings_rule-FormatStringManipulation
        System.out.printf(Locale.US, format, "John", "Smith"); //BAD

        // ruleid: java_strings_rule-FormatStringManipulation
        System.out.format(format, "John", "Smith"); //BAD
        // ruleid: java_strings_rule-FormatStringManipulation
        System.out.format(Locale.US, format, "John", "Smith"); //BAD

        String format2 = "The customer: %s %s" + request.getParameter("suffix");

        // ruleid: java_strings_rule-FormatStringManipulation
        String.format(format2, "John", "Smith"); //BAD
        // ruleid: java_strings_rule-FormatStringManipulation
        String.format(Locale.US, format2, "John", "Smith"); //BAD

    }
}
