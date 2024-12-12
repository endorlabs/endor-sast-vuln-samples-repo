import javax.crypto.KeyGenerator;
import java.security.NoSuchAlgorithmException;

public class KeyGen {

    public void generateKey1() throws NoSuchAlgorithmException {
        // ruleid: java-blowfish-insufficient-key-size
        KeyGenerator kg = KeyGenerator.getInstance("Blowfish");
        kg.init(64);
    }

    public void generateKey2() throws NoSuchAlgorithmException {
        // okruleid: java-blowfish-insufficient-key-size
        KeyGenerator kg = KeyGenerator.getInstance("Blowfish");
        kg.init(256);
    }

    public void generateKey3() throws NoSuchAlgorithmException {
        // okruleid: java-blowfish-insufficient-key-size
        KeyGenerator kg = KeyGenerator.getInstance("AES");
        kg.init(256);
    }

    public void generateKey4() throws NoSuchAlgorithmException {
        // ruleid: java-blowfish-insufficient-key-size
        KeyGenerator kg = KeyGenerator.getInstance("Blowfish");
        kg.init(64, null);
    }

    public void generateKey5() throws NoSuchAlgorithmException {
        // okruleid: java-blowfish-insufficient-key-size
        KeyGenerator kg = KeyGenerator.getInstance("AES");
        kg.init(64, null);
    }
}