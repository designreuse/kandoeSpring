package be.kdg.kandoe.backend.services.convertors;


import java.io.File;
import java.nio.file.Paths;

/**
 * Creates correct filepath for wanted ShipId
 */
public class FilePathService {

    public String getFile(String fileName){
        File file = Paths.get("src", "main", "resources", "excel", fileName + ".csv").normalize().toFile();
        String fileString = file.toString();

        return fileString;
    }
}
