package be.kdg.kandoe.backend.services.convertors;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.services.exceptions.ConvertorException;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

@Component
public class CsvToCardConvertor implements CardConvertorAdapter {
    private Logger logger = Logger.getLogger(CsvToCardConvertor.class);

    public CsvToCardConvertor() throws Exception {
    }

    @Override
    public List<Card> toCards(String csvFileName) throws ConvertorException {
        logger.info(this.getClass().toString() + ": converting csv file to collection of cards");
        List<Card> cards = new ArrayList<>();

        try {
            BufferedReader csvReader;
            csvReader = new BufferedReader(new FileReader(csvFileName));

            int line = 0;
            List<String> headers = new ArrayList<>(2);

            String text = null;
            while ((text = csvReader.readLine()) != null) {
                if (line == 0) { // Header row
                    String[] values = text.split(";");
                    for(String col : values) {
                        if (!values[0].equals("Description")) {
                            ConvertorException ex = new ConvertorException("No header values");
                            logger.warn(this.getClass().toString() + ": No header values in the csv file");
                            throw ex;
                        }

                        headers.add(col);
                    }
                } else {
                    Card card;
                    String description = null;
                    String imageURL = null;

                    if(text.endsWith(";")){
                        text = text.replace(";","");
                        description = text;
                        imageURL = null;
                    } else {
                        String[] columns = text.split(";");

                        for (int col = 0; col < headers.size(); col++) {
                            String header = headers.get(col);

                            if (header.equals("Description")) {
                                description = columns[col];
                            } else if (header.equals("ImageURL")) {
                                imageURL = columns[col];
                            }
                        }
                    }

                    if (imageURL != null) {
                        card = new Card(description, imageURL);
                    } else {
                        card = new Card(description);
                    }
                    cards.add(card);
                }
                line++;
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            throw new ConvertorException("Conversion from file " + csvFileName + " to collection of Card objects failed", ex);
        }

        logger.info(this.getClass().toString() + ": Converted csv file to collection of cards");
        return cards;
    }

}
