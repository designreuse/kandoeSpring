package be.kdg.kandoe;

import be.kdg.kandoe.backend.config.BackendContextConfig;
import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.services.exceptions.ConvertorException;
import be.kdg.kandoe.backend.services.convertors.CsvToCardConvertor;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import javax.transaction.Transactional;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

/**
 * Created by amy on 22/02/2016.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = BackendContextConfig.class)
@TransactionConfiguration(defaultRollback = true)
@Transactional
public class CsvConvertorTest {

    @Autowired
    private CsvToCardConvertor csvToCardConvertor;

    @Value("C:/Users/amy/Documents/School/Ba3/Integratieproject/KandoeSpring/src/main/resources/excel/test.csv")
    private String testFile;

    @Value("C:/Users/amy/Documents/School/Ba3/Integratieproject/KandoeSpring/src/main/resources/excel/falseTest.csv")
    private String falseTestFile;

    @Test(expected = ConvertorException.class)
    public void readFileWithoutHeader() throws ConvertorException{
        csvToCardConvertor.toCards(falseTestFile);
    }

    @Test
    public void readFile() throws ConvertorException {
        /*List<Card> cards = csvToCardConvertor.toCards(testFile);
        cards.forEach(card -> assertThat(card.getDescription(), notNullValue()));
        assertThat(cards.get(1).getImageURL(), nullValue());*/
    }



}
