/**
 * OWASP Benchmark v1.2
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
 * @author Dave Wichers
 * @created 2015
 */
package org.owasp.benchmark.testcode;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(value = "/trustbound-00/BenchmarkTest00004")
public class BenchmarkTest00004 extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        javax.servlet.http.Cookie userCookie =
                new javax.servlet.http.Cookie("BenchmarkTest00004", "color");
        userCookie.setMaxAge(60 * 3); // Store cookie for 3 minutes
        userCookie.setSecure(true);
        userCookie.setPath(request.getRequestURI());
        userCookie.setDomain(new java.net.URL(request.getRequestURL().toString()).getHost());
        response.addCookie(userCookie);
        javax.servlet.RequestDispatcher rd =
                request.getRequestDispatcher("/trustbound-00/BenchmarkTest00004.html");
        rd.include(request, response);
    }

    /**
     * BenchmarkTest00004
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // some code
        response.setContentType("text/html;charset=UTF-8");

        javax.servlet.http.Cookie[] theCookies = request.getCookies();

        String param = "noCookieValueSupplied";
        if (theCookies != null) {
            for (javax.servlet.http.Cookie theCookie : theCookies) {
                if (theCookie.getName().equals("BenchmarkTest00004")) {
                    param = java.net.URLDecoder.decode(theCookie.getValue(), "UTF-8");
                    break;
                }
            }
        }

        // javax.servlet.http.HttpSession.setAttribute(java.lang.String^,java.lang.Object)
        // ruleid: java-tainted-session
        request.getSession().setAttribute(param, "10340");

        response.getWriter()
                .println(
                        "Item: '"
                                + org.owasp.benchmark.helpers.Utils.encodeForHTML(param)
                                + "' with value: '10340' saved in session.");
    }

    /**
     * BenchmarkTest00326
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        String param = "";
        java.util.Enumeration<String> headers = request.getHeaders("BenchmarkTest00326");

        if (headers != null && headers.hasMoreElements()) {
            param = headers.nextElement(); // just grab first element
        }

        // URL Decode the header value since req.getHeaders() doesn't. Unlike req.getParameters().
        param = java.net.URLDecoder.decode(param, "UTF-8");

        String bar;

        // Simple if statement that assigns param to bar on true condition
        int num = 196;
        if ((500 / 42) + num > 200) bar = param;
        else bar = "This should never happen";

        // javax.servlet.http.HttpSession.setAttribute(java.lang.String^,java.lang.Object)
        // ruleid: java-tainted-session
        request.getSession().setAttribute(bar, "10340");

        response.getWriter()
                .println(
                        "Item: '"
                                + org.owasp.benchmark.helpers.Utils.encodeForHTML(bar)
                                + "' with value: '10340' saved in session.");
    }
}