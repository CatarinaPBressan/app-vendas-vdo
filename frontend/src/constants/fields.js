export const FIELDS = {
  cpf: {
    mask: "999.999.999-99",
    pattern: "\\d{3}.\\d{3}.\\d{3}-\\d{2}",
    placeholder: "XXX.XXX.XXX-XX",
  },
  telefone_celular: {
    mask: "(99)99999-9999",
    pattern: "\\(\\d{2}\\)\\d{5}-\\d{4}",
    placeholder: "(XX)XXXXX-XXXX",
  },
  cep: {
    mask: "99999-999",
    pattern: "\\d{5}-\\d{3}",
    placeholder: "XXXXX-XXX",
  },
};

export const UFS_BRASIL = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export const PEDIDO_FIELDS = [
  "nome_completo",
  "cpf",
  "email",
  "telefone_celular",
  "observacoes",
];
