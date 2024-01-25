package pbs.edu.rekrutacja.models;

import jakarta.persistence.*;

@Entity
@Table(name = "PRODUCENT")
public class Producent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProducenta;

    private String nazwa;

    public Producent(Long idProducenta, String nazwa) {
        this.idProducenta = idProducenta;
        this.nazwa = nazwa;
    }

    public Producent() {
    }

    public Long getIdProducenta() {
        return idProducenta;
    }

    public void setIdProducenta(Long idProducenta) {
        this.idProducenta = idProducenta;
    }

    public String getNazwa() {
        return nazwa;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }
}

