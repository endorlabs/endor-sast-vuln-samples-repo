/**
 * OWASP Benchmark Project v1.2
 *
 * <p>This file is part of the Open Web Application Security Project (OWASP) Benchmark Project. For
 * details, please see <a
 * href="https://owasp.org/www-project-benchmark/">https://owasp.org/www-project-benchmark/</a>.
 *
 * <p>The OWASP Benchmark is free software: you can redistribute it and/or modify it under the terms
 * of the GNU General Public License as published by the Free Software Foundation, version 2.
 *
 * <p>The OWASP Benchmark is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE. See the GNU General Public License for more details.
 *
 * @author Nick Sanidas
 * @created 2015
 */
package org.owasp.benchmark.testcode;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.owasp.encoder.Encode;

@WebServlet(value = "/xss-01/BenchmarkTest00713")
public class BenchmarkTest00713 extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }

    /**
     * BenchmarkTest00713
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        String[] values = request.getParameterValues("BenchmarkTest00713");
        String param;
        if (values != null && values.length > 0) param = values[0];
        else param = "";

        String bar = org.apache.commons.lang.StringEscapeUtils.escapeHtml(param);

        response.setHeader("X-XSS-Protection", "0");
        Object[] obj = {"a", "b"};
        // okruleid: java-xss-servlet-writer
        response.getWriter().format(java.util.Locale.US, bar, obj);
    }

    /**
     * BenchmarkTest00726
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        String[] values = request.getParameterValues("BenchmarkTest00726");
        String param;
        if (values != null && values.length > 0) param = values[0];
        else param = "";

        String bar = org.springframework.web.util.HtmlUtils.htmlEscape(param);

        response.setHeader("X-XSS-Protection", "0");
        // okruleid: java-xss-servlet-writer
        response.getWriter().println(bar);
    }

    protected void danger(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String input1 = req.getParameter("input1");
        // ruleid: java-xss-servlet-writer
        resp.getWriter().write(input1);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String input1 = req.getParameter("input1"); // BAD
        String sessionId = req.getRequestedSessionId(); // BAD
        String queryString = req.getQueryString(); // BAD

        String referrer = req.getHeader("Referer"); //Should have a higher priority
        if (referrer != null && referrer.startsWith("http://company.ca")) {
            // Header access
            String host = req.getHeader("Host"); // BAD
            String referer = req.getHeader("Referer"); // BAD
            String userAgent = req.getHeader("User-Agent"); // BAD
        }

        PrintWriter writer = resp.getWriter();
        // ruleid: java-xss-servlet-writer
        writer.write(input1);
    }


    protected void danger3(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String input1 = req.getParameter("input1");
        // ruleid: java-xss-servlet-writer
        resp.getWriter().write(input1);
    }

    protected void ok2(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String input1 = req.getParameter("input1");
        PrintWriter writer = resp.getWriter();
        // ok: java-xss-servlet-writer
        writer.write(Encode.forHtml(input1));
    }
}