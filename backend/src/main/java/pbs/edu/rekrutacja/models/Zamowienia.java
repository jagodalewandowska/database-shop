package pbs.edu.rekrutacja.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "ZAMOWIENIA")
public class Zamowienia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_zam")
    private Integer idZam;

    @Column(name = "id_klienta", nullable = false)
    private Integer idKlienta;

    @Column(name = "data_zamowienia", nullable = false)
    private Date dataZamowienia;

    @Column(name = "koszt_calkowity", nullable = false)
    private BigDecimal kosztCalkowity;

    @Column(name = "sposob_oplaty", nullable = false)
    private String sposobOplaty;

    @Size(max = 30)
    @Column(name = "id_faktury")
    private String idFaktury;

    @Column(name = "opis", length = 50)
    private String opis;

    public Zamowienia() {
    }

    public Zamowienia(Integer idZam, Integer idKlienta, Date dataZamowienia, BigDecimal kosztCalkowity, String sposobOplaty, String idFaktury, String opis) {
        this.idZam = idZam;
        this.idKlienta = idKlienta;
        this.dataZamowienia = dataZamowienia;
        this.kosztCalkowity = kosztCalkowity;
        this.sposobOplaty = sposobOplaty;
        this.idFaktury = idFaktury;
        this.opis = opis;
    }

    public Integer getIdZam() {
        return idZam;
    }

    public void setIdZam(Integer idZam) {
        this.idZam = idZam;
    }

    public Integer getIdKlienta() {
        return idKlienta;
    }

    public void setIdKlienta(Integer idKlienta) {
        this.idKlienta = idKlienta;
    }

    public Date getDataZamowienia() {
        return dataZamowienia;
    }

    public void setDataZamowienia(Date dataZamowienia) {
        this.dataZamowienia = dataZamowienia;
    }

    public BigDecimal getKosztCalkowity() {
        return kosztCalkowity;
    }

    public void setKosztCalkowity(BigDecimal kosztCalkowity) {
        this.kosztCalkowity = kosztCalkowity;
    }

    public String getSposobOplaty() {
        return sposobOplaty;
    }

    public void setSposobOplaty(String sposobOplaty) {
        this.sposobOplaty = sposobOplaty;
    }

    public String getIdFaktury() {
        return idFaktury;
    }

    public void setIdFaktury(String idFaktury) {
        this.idFaktury = idFaktury;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }
}

