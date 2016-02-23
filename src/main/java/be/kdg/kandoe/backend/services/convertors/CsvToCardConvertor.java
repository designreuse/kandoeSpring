package be.kdg.kandoe.backend.services.convertors;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.services.exceptions.ConvertorException;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

/**
 * Created by amy on 22/02/2016.
 */

@Component
public class CsvToCardConvertor implements CardConvertorAdapter {
    private DocumentBuilderFactory documentFactory = null;
    private DocumentBuilder documentBuilder = null;
    private Logger logger = Logger.getLogger(CsvToCardConvertor.class);

    public CsvToCardConvertor() throws Exception {
        documentFactory = DocumentBuilderFactory.newInstance();
        documentBuilder = documentFactory.newDocumentBuilder();
    }

    @Override
    public List<Card> toCards(String csvFileName) throws ConvertorException {

        List<Card> cards = new ArrayList<>();

        try {
            BufferedReader csvReader;
            csvReader = new BufferedReader(new FileReader(new FilePathService().getFile(csvFileName)));

            int line = 0;
            List<String> headers = new ArrayList<>(2);


            String text = null;
            while ((text = csvReader.readLine()) != null) {
                StringTokenizer st = new StringTokenizer(text, ";", false);
                List<String> rowValues = new ArrayList<>(st.countTokens());
                int index = 0;
                    while (st.hasMoreTokens()) {
                        String next = st.nextToken();
                            rowValues.add(index++, next);

                }

                if (line == 0) { // Header row

                    for (String col : rowValues) {
                            if (!rowValues.get(0).equals("Description")) {
                                ConvertorException ex = new ConvertorException("No header values");
                                throw ex;
                            }

                        headers.add(col);
                    }

                } else {
                    Card card;
                    String description = null;
                    String imageURL = null;

                    for (int col = 0; col < headers.size(); col++) {
                        String header = headers.get(col);

                        if (header.equals("Description")) {
                            description = rowValues.get(col);
                        } else if (header.equals("ImageURL")) {
                            if(rowValues.get(col).equals(" ")) {
                                imageURL = null;
                            } else{
                                imageURL = rowValues.get(col);
                            }
                        }
                    }
                    if(imageURL != null) {
                        card = new Card(description, imageURL);
                    } else{
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

        return cards;
    }

    @Override
    public Card toCard(String string) throws ConvertorException {
        return null;
    }
}
