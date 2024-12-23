// License: LGPL-3.0 License (c) find-sec-bugs
package inject;

import com.opensymphony.xwork2.ognl.OgnlReflectionProvider;
import com.opensymphony.xwork2.ognl.OgnlUtil;
import com.opensymphony.xwork2.util.TextParseUtil;
import com.opensymphony.xwork2.util.ValueStack;
import ognl.OgnlException;

import javax.management.ReflectionException;
import java.beans.IntrospectionException;
import java.util.HashMap;
import java.util.Map;

public class OgnlInjection {

    public void unsafeOgnlUtil(OgnlUtil ognlUtil, String input, Map<String, ?> propsInput) throws OgnlException, ReflectionException {
        // ruleid: java_inject_rule-OgnlInjection
        ognlUtil.setValue(input, null, null, "12345");
        // ruleid: java_inject_rule-OgnlInjection
        ognlUtil.getValue(input, null, null, null);
        // ruleid: java_inject_rule-OgnlInjection
        ognlUtil.setProperty(input, "12345", null, null);
        // ruleid: java_inject_rule-OgnlInjection
        ognlUtil.setProperty(input, "12345", null, null, true);
        // ruleid: java_inject_rule-OgnlInjection
        ognlUtil.setProperties(propsInput, null, null);
        // ruleid: java_inject_rule-OgnlInjection
        ognlUtil.setProperties(propsInput, null, null, true);
        // ruleid: java_inject_rule-OgnlInjection
        ognlUtil.setProperties(propsInput, null, true);
        // ruleid: java_inject_rule-OgnlInjection
        ognlUtil.setProperties(propsInput, null);
        // ognlUtil.callMethod(input, null, null);
        // ruleid: java_inject_rule-OgnlInjection
        ognlUtil.compile(input);
        // ruleid: java_inject_rule-OgnlInjection
        ognlUtil.compile(input);

    }

    public void safeOgnlUtil(OgnlUtil ognlUtil) throws OgnlException, ReflectionException {
        String input = "thisissafe";

        ognlUtil.setValue(input, null, null, "12345");
        ognlUtil.getValue(input, null, null, null);
        ognlUtil.setProperty(input, "12345", null, null);
        ognlUtil.setProperty(input, "12345", null, null, true);
        ognlUtil.setProperties(new HashMap<String, String>(), null, null);
        ognlUtil.setProperties(new HashMap<String, String>(), null, null, true);
        ognlUtil.setProperties(new HashMap<String, String>(), null, true);
        ognlUtil.setProperties(new HashMap<String, String>(), null);
        // ognlUtil.callMethod(input, null, null);
        ognlUtil.compile(input);
        ognlUtil.compile(input);

    }

    public void unsafeOgnlReflectionProvider(String input, Map<String, String> propsInput, OgnlReflectionProvider reflectionProvider, Class type) throws ReflectionException, IntrospectionException {
        // ruleid: java_inject_rule-OgnlInjection
        reflectionProvider.getGetMethod(type, input);
        // ruleid: java_inject_rule-OgnlInjection
        reflectionProvider.getSetMethod(type, input);
        // ruleid: java_inject_rule-OgnlInjection
        reflectionProvider.getField(type, input);
        // ruleid: java_inject_rule-OgnlInjection
        reflectionProvider.setProperties(propsInput, null, null, true);
        // ruleid: java_inject_rule-OgnlInjection
        reflectionProvider.setProperties(propsInput, null, null);
        // ruleid: java_inject_rule-OgnlInjection
        reflectionProvider.setProperties(propsInput, null);
        // ruleid: java_inject_rule-OgnlInjection
        reflectionProvider.setProperty(input, "test", null, null);
        // reflectionProvider.setProperty( input, "test",null, null, true);
        // ruleid: java_inject_rule-OgnlInjection
        reflectionProvider.getValue(input, null, null);
        // ruleid: java_inject_rule-OgnlInjection
        reflectionProvider.setValue(input, null, null, null);
    }

    public void safeOgnlReflectionProvider(OgnlReflectionProvider reflectionProvider, Class type) throws IntrospectionException, ReflectionException {
        String input = "thisissafe";
        String constant1 = "";
        String constant2 = "";
        reflectionProvider.getGetMethod(type, input);
        reflectionProvider.getSetMethod(type, input);
        reflectionProvider.getField(type, input);
        reflectionProvider.setProperties(new HashMap<String, String>(), null, null, true);
        reflectionProvider.setProperties(new HashMap<String, String>(), null, null);
        reflectionProvider.setProperties(new HashMap<String, String>(), null);
        reflectionProvider.setProperty("test", constant1, null, null);
        // reflectionProvider.setProperty("test", constant2, null, null, true);
        reflectionProvider.getValue(input, null, null);
        reflectionProvider.setValue(input, null, null, null);
    }

    public void unsafeTextParseUtil(String input) {
        // ruleid: java_inject_rule-OgnlInjection
        TextParseUtil.translateVariables(input, null);
        // ruleid: java_inject_rule-OgnlInjection
        TextParseUtil.translateVariables(input, null, null);
        TextParseUtil.translateVariables('a', input, null);
        TextParseUtil.translateVariables('a', input, null, null);
        TextParseUtil.translateVariables('a', input, null, null, null, 0);
    }

    public void safeTextParseUtil(ValueStack stack, TextParseUtil.ParsedValueEvaluator parsedValueEvaluator, Class type) {
        String input = "1+1";
        TextParseUtil.translateVariables(input, stack);
        TextParseUtil.translateVariables(input, stack, parsedValueEvaluator);
        TextParseUtil.translateVariables('a', input, stack);
        TextParseUtil.translateVariables('a', input, stack, type);

        TextParseUtil.translateVariables('a', input, stack, type, parsedValueEvaluator, 0);
    }

}
