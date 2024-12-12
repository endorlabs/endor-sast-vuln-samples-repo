import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.Arrays;

public class CommandExecutor {

    private static void executeWithRuntimeExec1() {
        try {
            // ruleid: java-external-search-path
            Process process = Runtime.getRuntime().exec("curl https://www.google.de");
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            System.err.println("Error executing command with Runtime.exec: " + e.getMessage());
        }
    }

    private static void executeWithRuntimeExec2() {
        try {
            // okruleid: java-external-search-path
            Process process = Runtime.getRuntime().exec("/usr/bin/curl https://www.google.de");
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            System.err.println("Error executing command with Runtime.exec: " + e.getMessage());
        }
    }

    private static void executeWithRuntimeExec3() {
        try {
            String cmd = "curl https://www.google.de";
            // ruleid: java-external-search-path
            Process process = Runtime.getRuntime().exec(cmd);
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            System.err.println("Error executing command with Runtime.exec: " + e.getMessage());
        }
    }

    private static void executeWithRuntimeExec4() {
        try {
            String cmd = "/usr/bin/curl https://www.google.de";
            // okruleid: java-external-search-path
            Process process = Runtime.getRuntime().exec(cmd, new String[] {});
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            System.err.println("Error executing command with Runtime.exec: " + e.getMessage());
        }
    }

    private static void executeWithRuntimeExec5() {
        try {
            String[] cmd = new String[] { "/usr/bin/curl", "https://www.google.de"};
            // todoruleid: java-external-search-path
            Process process = Runtime.getRuntime().exec(cmd);
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            System.err.println("Error executing command with Runtime.exec: " + e.getMessage());
        }
    }

    private static void executeWithProcessBuilder1() {
        try {
            // ruleid: java-external-search-path
            ProcessBuilder processBuilder = new ProcessBuilder("make", "foo");
            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            System.err.println("Error executing command with ProcessBuilder: " + e.getMessage());
        }
    }

    private static void executeWithProcessBuilder2() {
        try {
            // okruleid: java-external-search-path
            ProcessBuilder processBuilder = new ProcessBuilder("/usr/bin/make", "foo");
            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            System.err.println("Error executing command with ProcessBuilder: " + e.getMessage());
        }
    }
}
