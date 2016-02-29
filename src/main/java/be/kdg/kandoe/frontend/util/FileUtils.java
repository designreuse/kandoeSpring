package be.kdg.kandoe.frontend.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public class FileUtils {

    public static void saveFile(String path, String filename, MultipartFile file) throws IOException{
        File f = new File(path);
        if(!f.exists()){
            f.mkdirs();
        }
        f = new File(path + "/" + filename);
        file.transferTo(f);
    }
}
