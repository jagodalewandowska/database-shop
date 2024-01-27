package pbs.edu.rekrutacja.models;

import jakarta.persistence.*;
import org.antlr.v4.runtime.LexerInterpreter;

@Entity
@Table(name = "PRODUCENT")
public class Producent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producenta")
    private Integer id_producenta;

    private String nazwa;

    public Producent(Integer idProducenta, String nazwa) {
        this.id_producenta = idProducenta;
        this.nazwa = nazwa;
    }

    public Producent() {
    }

    public Integer getIdProducenta() {
        return id_producenta;
    }

    public void setIdProducenta(Integer id_producenta) {
        this.id_producenta = id_producenta;
    }

    public String getNazwa() {
        return nazwa;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }
}

