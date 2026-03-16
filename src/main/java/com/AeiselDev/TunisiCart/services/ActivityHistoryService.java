package com.AeiselDev.TunisiCart.services;

import com.AeiselDev.TunisiCart.entities.ActivityHistory;
import com.AeiselDev.TunisiCart.repositories.ActivityHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityHistoryService {

    private final ActivityHistoryRepository activityHistoryRepository;

    public List<ActivityHistory> getActivityHistoryByUserId(Long userId) {
        return activityHistoryRepository.findByUserId(userId);
    }

    public void recordView(Long productId) {
        ActivityHistory activity = new ActivityHistory();
        activity.setProductId(productId);
        activity.setActionType("view");
        activity.setTimestamp(LocalDateTime.now());
        activityHistoryRepository.save(activity);
    }
}
