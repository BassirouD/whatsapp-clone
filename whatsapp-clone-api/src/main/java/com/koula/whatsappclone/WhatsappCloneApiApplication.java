package com.koula.whatsappclone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class WhatsappCloneApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(WhatsappCloneApiApplication.class, args);
    }

}
