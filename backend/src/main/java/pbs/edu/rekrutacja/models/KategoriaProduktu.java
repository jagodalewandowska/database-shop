package pbs.edu.rekrutacja.models;

import jakarta.persistence.*;

@Entity
@Table(name = "KATEGORIA_PRODUKTU")
public class KategoriaProduktu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_kategorii")
    private Integer id;

    @Column(name = "nazwa", unique = true, nullable = false, length = 30)
    private String nazwa;

    @ManyToOne
    @JoinColumn(name = "id_kat_nadrzednej", referencedColumnName = "id_kategorii")
    private KategoriaProduktu kategoriaNadrzedna;

    public KategoriaProduktu() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNazwa() {
        return nazwa;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public KategoriaProduktu getKategoriaNadrzedna() {
        return kategoriaNadrzedna;
    }

    public void setKategoriaNadrzedna(KategoriaProduktu kategoriaNadrzedna) {
        this.kategoriaNadrzedna = kategoriaNadrzedna;
    }

    public KategoriaProduktu(Integer id, String nazwa, KategoriaProduktu kategoriaNadrzedna) {
        this.id = id;
        this.nazwa = nazwa;
        this.kategoriaNadrzedna = kategoriaNadrzedna;
    }
}

