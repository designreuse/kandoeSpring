package be.kdg.kandoe.frontend.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public class FileUtils {

    public static String saveFile(String path, String filename, MultipartFile file) throws IOException{
        String completePath = path + File.separator + filename;
        File f = new File(completePath);

        if(!f.exists()){
            f.mkdirs();
        }
        file.transferTo(f);
        return completePath;
    }
}
