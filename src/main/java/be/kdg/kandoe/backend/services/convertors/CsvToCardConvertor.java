package be.kdg.kandoe.backend.services.convertors;

import be.kdg.kandoe.backend.dom.game.Card;
import org.apache.log4j.Logger;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.StringTokenizer;

/**
 * Created by amy on 22/02/2016.
 */
public class CsvToCardConvertor implements CardConvertorAdapter {
    private DocumentBuilderFactory documentFactory = null;
    private DocumentBuilder documentBuilder = null;
    private Logger logger = Logger.getLogger(CsvToCardConvertor.class);

    public CsvToCardConvertor() throws Exception {
        documentFactory = DocumentBuilderFactory.newInstance();
        documentBuilder = documentFactory.newDocumentBuilder();
    }

    @Override
    public Collection<Card> toCards(String csvFileName) throws ConvertorException {

        Collection<Card> cards = new ArrayList<Card>();

        try {
            BufferedReader csvReader;
            csvReader = new BufferedReader(new FileReader(csvFileName));

            int line = 0;
            List<String> headers = new ArrayList<String>(3);


            String text = null;
            while ((text = csvReader.readLine()) != null) {

                StringTokenizer st = new StringTokenizer(text, ",", false);
                List<String> rowValues = new ArrayList<>(st.countTokens());
                int index = 0;
                while (st.hasMoreTokens()) {

                    String next = st.nextToken();
                    rowValues.add(index++, next);

                }

                if (line == 0) { // Header row

                    for (String col : rowValues) {
                        headers.add(col);
                    }

                } else {
                    Card card;
                    String centraleId = null;
                    int afstandTotKade = 0;
                    String delay = null;

                    for (int col = 0; col < headers.size(); col++) {
                        String header = headers.get(col);

                        if (header.equals("delay")) {
                            delay = rowValues.get(col);
                        } else if (header.equals("centraleID")) {
                            centraleId = rowValues.get(col);
                        } else if (header.equals("afstandTotKade")) {
                            afstandTotKade = Integer.parseInt(rowValues.get(col));
                        }
                    }
                    /*card = new PositionMessage(FilenameUtils.getBaseName(csvFileName), centraleId, afstandTotKade, delay);
                    messages.add(message);*/
                }
                line++;
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            throw new ConvertorException("Conversion from file" + csvFileName + "to collection of Message objects failed", ex);
        }

        return cards;
    }

    @Override
    public Card toCard(String string) throws ConvertorException {
        return null;
    }
}
